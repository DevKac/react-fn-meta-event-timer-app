import config from '../config/config';
import {
  getHoursFromTimestring,
  getMinutesFromTimestring,
  getSecondsFromTimestring
} from './time-helpers';
import MetaEventStatus from '../enums/meta-event-status';

// @TODO: foolproof those functions
// @TODO: add some testing
export const getMetaEventStartAndEndDate = (metaEvent, dateNow) => {
  if (!metaEvent || !dateNow) {
    return null;
  }

  // @INFO: unless event ended more than X time ago we assume it's today's event
  let eventStartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), getHoursFromTimestring(metaEvent.startTime), getMinutesFromTimestring(metaEvent.startTime), getSecondsFromTimestring(metaEvent.startTime));
  let eventEndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), getHoursFromTimestring(metaEvent.endTime), getMinutesFromTimestring(metaEvent.endTime), getSecondsFromTimestring(metaEvent.endTime));

  if (eventEndDate.getTime() + config.maxFinishedAgoTime < dateNow.getTime()) {
    // @INFO: event jutrzejszy
    eventStartDate.setDate(eventStartDate.getDate() + 1); 
    eventEndDate.setDate(eventEndDate.getDate() + 1); 
  }

  return [eventStartDate, eventEndDate];
}

export const getMetaEventStatus = (metaEventStartDate, metaEventEndDate, dateNow) => {
  if (!metaEventStartDate || !metaEventEndDate || !dateNow) {
    return null;
  }

  if (metaEventStartDate >= dateNow) {
    return MetaEventStatus.futureEvent;
  }

  if (metaEventEndDate >= dateNow) {
    return MetaEventStatus.inProgress;
  } else {
    return MetaEventStatus.justEnded;
  }
}

export const getMetaEventStartsIn = (metaEventStartDate, dateNow) => {
  if (!metaEventStartDate || !dateNow) {
    return null;
  }

  return metaEventStartDate - dateNow;
}

export const getMetaEventDuration = (metaEventStartDate, metaEventEndDate) => {
  if (!metaEventStartDate || !metaEventEndDate) {
    return null;
  }

  return metaEventEndDate - metaEventStartDate;
}

export const getMetaEventEndsIn = (metaEventEndDate, dateNow) => {
  if (!metaEventEndDate || !dateNow) {
    return null;
  }

  return metaEventEndDate - dateNow;
}

export const getMetaEventFinished = (metaEventEndDate, dateNow) => {
  if (!metaEventEndDate || !dateNow) {
    return null;
  }

  return dateNow - metaEventEndDate;
}
