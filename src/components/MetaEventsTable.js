import { useState, useEffect } from 'react';
import MetaEventsTableRow from './MetaEventsTableRow';
import './MetaEventsTable.css'

const MetaEventsTable = ({metaEvents}) => {
  const [sortedMetaEvents, setSortedMetaEvents] = useState([]);

  useEffect(() => {
    if (!metaEvents?.length) {
      return;
    }

    setSortedMetaEvents(metaEvents.sort((metaEventA, metaEventB) => {
      if (metaEventA.startDate > metaEventB.startDate) {
        return 1;
      }
      if (metaEventA.startDate < metaEventB.startDate) {
        return -1;
      }
      return 0;
    }));
  }, [metaEvents])

  return (
    <div className="grid-container">
      { sortedMetaEvents.map((metaEvent) => 
        <MetaEventsTableRow key = { metaEvent.id } metaEvent = { metaEvent } />
      )}
    </div>
  );
}

export default MetaEventsTable;
