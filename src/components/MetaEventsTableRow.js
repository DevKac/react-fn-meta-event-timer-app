import React from 'react';
import { useState, useEffect } from 'react';
import MetaEventStatus from '../enums/meta-event-status';
import DisplayTime from './DisplayTime';
import './MetaEventsTableRow.css';

const MetaEventsTableRow = ({metaEvent}) => {
  const [gridItemStatusClass, setGridItemStatusClass] = useState('');

  useEffect(() => {
    if (!metaEvent) {
      return '';
    }

    switch (metaEvent.status) {
      case MetaEventStatus.futureEvent:
        setGridItemStatusClass('incomming-event');
        break;
      case MetaEventStatus.inProgress:
        setGridItemStatusClass('active-event');
        break;
      case MetaEventStatus.justEnded:
        setGridItemStatusClass('finished-event');
        break;
      default:
        setGridItemStatusClass('');
    }
  }, [metaEvent])

  return (
    <div className={'grid-item ' + gridItemStatusClass}>
      <div>
        Name: { metaEvent.name }
      </div>
      <div>
        Location: { metaEvent.location }
      </div>
      {(() => {
        switch (metaEvent.status) {
          case MetaEventStatus.futureEvent:
            return (
              <React.Fragment>
                <div>
                  Starts in <DisplayTime timeInMilliseconds = { metaEvent.startsIn } />
                </div>
                <div>
                  Duration <DisplayTime timeInMilliseconds = { metaEvent.duration } />
                </div>
              </React.Fragment>
            );
          case MetaEventStatus.inProgress:
            return (
              <React.Fragment>
                <div>
                  In progress
                </div>
                <div>
                  Ends in <DisplayTime timeInMilliseconds = { metaEvent.endsIn } />
                </div>
              </React.Fragment>
            )
          case MetaEventStatus.justEnded:
            return (
              <React.Fragment>
                <div>
                  Finished <DisplayTime timeInMilliseconds = { metaEvent.finished } /> ago
                </div>
              </React.Fragment>
            );
          default:
            return (
              <React.Fragment>
                <div>
                  Starts at { metaEvent.startTime }
                </div>
                <div>
                  Ends at { metaEvent.endTime }
                </div>
              </React.Fragment>
            );
        }
      })()}
    </div>
  );
};

export default MetaEventsTableRow;
