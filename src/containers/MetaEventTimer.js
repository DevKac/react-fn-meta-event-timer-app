import { useState, useEffect } from 'react';
import MetaEventsTable from '../components/MetaEventsTable';
import metaEventsData from '../data/meta-events.json';
import MetaEventStatus from '../enums/meta-event-status';
import {
  getMetaEventStartAndEndDate,
  getMetaEventStatus,
  getMetaEventStartsIn,
  getMetaEventDuration,
  getMetaEventEndsIn,
  getMetaEventFinished,
} from '../helpers/meta-event-calculations';
import config from '../config/config';
import DisplayError from '../components/DisplayError';
import './MetaEventTimer.css';

const MetaEventTimer = () => {
  const [metaEvents, setMetaEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let calculationsRefreshingInterval;

  const fetchMetaEvents = () => {
    console.log('fetchMetaEvents called');
    return new Promise((resolve, reject) => {
      if (config.fetchFailed) {
        return setTimeout(
          () => reject(new Error('Fetch failed')), config.fetchDelay);
      }
      return setTimeout(
        () => resolve({metaEvents: metaEventsData}), config.fetchDelay
      );
    })
  }

  const handleInitFetchingMetaEvents = () => {
    console.log('handleInitFetchingMetaEvents called');
    setIsLoading(true);
    setIsError(false);
    fetchMetaEvents().then(response => {
      if (!response) {
        handleFetchingMetaEventsFailure();
        return;
      }
      calculateMetaEventsData(response.metaEvents);
      calculationsRefreshingInterval = setInterval(() => calculateMetaEventsData(response.metaEvents), config.intervalTime);
      setIsLoading(false);
    }).catch(error => {
      handleFetchingMetaEventsFailure(error);
    });
  }
  
  const handleFetchingMetaEventsFailure = (error = null) => {
    if (error) {
      console.log(error);
    }

    setIsError(true);
    setIsLoading(false);
  }

  const calculateMetaEventsData = (metaEvents) => {
    if (!metaEvents?.length) {
      return;
    }
    const dateNow = new Date();

    const calculatedMetaEvents = metaEvents.map(metaEvent => {
      const [metaEventStartDate, metaEventEndDate] = getMetaEventStartAndEndDate(metaEvent, dateNow);
      const metaEventStatus = getMetaEventStatus(metaEventStartDate, metaEventEndDate, dateNow);
      switch(metaEventStatus) {
        case MetaEventStatus.futureEvent:
          return {
            ...metaEvent,
            startDate: metaEventStartDate,
            endDate: metaEventEndDate,
            status: metaEventStatus,
            startsIn: getMetaEventStartsIn(metaEventStartDate, dateNow),
            duration: getMetaEventDuration(metaEventStartDate, metaEventEndDate),
          }
        case MetaEventStatus.inProgress:
          return {
            ...metaEvent,
            startDate: metaEventStartDate,
            endDate: metaEventEndDate,
            status: metaEventStatus,
            endsIn: getMetaEventEndsIn(metaEventEndDate, dateNow),

          }
        case MetaEventStatus.justEnded:
          return {
            ...metaEvent,
            startDate: metaEventStartDate,
            endDate: metaEventEndDate,
            status: metaEventStatus,
            finished: getMetaEventFinished(metaEventEndDate, dateNow),
          }
        default:
          return metaEvent;
      }
      
    });
    setMetaEvents(calculatedMetaEvents);
  }

  useEffect(() => {
    console.log('MetaEventTimer is mounting');
    handleInitFetchingMetaEvents();

    return () => {
      console.log('MetaEventTimer is unmounting');
      clearInterval(calculationsRefreshingInterval)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { isLoading ? <p className='loader'>Loading...</p> : 
        isError ? <DisplayError retryAction={handleInitFetchingMetaEvents} /> : <MetaEventsTable metaEvents={ metaEvents } />
      }
    </div>
  );
}

export default MetaEventTimer;
