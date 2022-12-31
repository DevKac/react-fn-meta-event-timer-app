// @INFO: functions work with hh:mm:ss format
export const getHoursFromTimestring = (timestring) => {
  if (!timestring) {
    return null;
  }

  return timestring.substring(0,2);
}

export const getMinutesFromTimestring = (timestring) => {
  if (!timestring) {
    return null;
  }

  return timestring.substring(3,5);
}

export const getSecondsFromTimestring = (timestring) => {
  if (!timestring) {
    return null;
  }

  return timestring.substring(6,8);
}
