import React  from 'react';
import './DisplayError.css';

const DisplayError = ({retryAction}) => {

  return (
    <div className='error-container'>
      <p>Error!</p>
      <button className='retry-button' onClick={retryAction}>Try again</button>
    </div>
    
  );
}

export default DisplayError;
