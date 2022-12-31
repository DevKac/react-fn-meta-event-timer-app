import React, { useState, useEffect } from 'react';

const DisplayTime = ({timeInMilliseconds}) => {
  const [displaySeconds, setDisplaySeconds] = useState();
  const [displayMinutes, setDisplayMinutes] = useState();
  const [displayHours, setDisplayHours] = useState();
  
  useEffect(() => {
    const timeInSeconds = Math.floor(timeInMilliseconds / 1000)
    setDisplaySeconds(timeInSeconds % 60);
    const timeInMinutes = Math.floor(timeInSeconds / 60);
    setDisplayMinutes(timeInMinutes % 60);
    setDisplayHours(Math.floor(timeInMinutes / 60));
  }, [timeInMilliseconds]);

  return (
    <span>
      { timeInMilliseconds === 0 ? 'a second' : '' }
      { displayHours ? <React.Fragment>{ displayHours } hours</React.Fragment> : '' }
      { displayMinutes ? <React.Fragment> { displayMinutes } minutes</React.Fragment> : '' }
      { (displayHours || displayMinutes) && displaySeconds ? <React.Fragment> and</React.Fragment> : '' }
      { displaySeconds ? <React.Fragment> { displaySeconds } seconds</React.Fragment> : '' }
    </span>
  );
}

export default DisplayTime;
