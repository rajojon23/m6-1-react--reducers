import React from 'react';

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
  };

  function reducer(state, action) {
    // TODO


    // console.log("reduce has been called, action:", action);
    switch(action.type){
        
        
        case "receive-seat-info-from-server":
            return {
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,                
            }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
    

  export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = (data) => {
      dispatch({
        type: "receive-seat-info-from-server",
        ...data,
      });
    };
  
    return (
      <SeatContext.Provider
        value={{
          state,
          actions: {
            receiveSeatInfoFromServer,
          },
        }}
      >
        {children}
      </SeatContext.Provider>
    );
  


    
  };