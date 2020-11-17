import React from 'react';
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';
import CircularProgress from '@material-ui/core/CircularProgress';

import GlobalStyles from './GlobalStyles';

function App() {

  const {
      state: {numOfRows, hasLoaded},
      actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

 React.useEffect(() => {
     fetch('/api/seat-availability')
       .then(res => res.json())
       .then(data => receiveSeatInfoFromServer(data));
   }, []);

  
  return (
    <>
      <GlobalStyles />

      { hasLoaded == true ? (
        <>
          This venue has {numOfRows} rows!
          <TicketWidget />
        </>
      ) : (
      
        <CircularProgress style={{position : "absolute", top: "50%"}}/>
      
      
      )}

      




    </>
  );
}



export default App;
