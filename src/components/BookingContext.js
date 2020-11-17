import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    seats: null,
    selectedSeatId: null,
    price: null,
};

    function reducer(state, action) {
        // console.log("reduce has been called, action:", action);
        switch(action.type){
            
            
            case "begin-booking-process":
                console.log("booking process launched");
                return {
                    ...state,
                    status: "seat-selected",
                    seats: null,
                    selectedSeatId: action.selectedSeatId,
                    price: action.price,                
                }
            default:
                throw new Error(`Unrecognized action: ${action.type}`);
        }
    }

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatSelectedInfo = (data) => {
      dispatch({
        type: "begin-booking-process",
        ...data,
      });
    };
  
    return (
      <BookingContext.Provider
        value={{
            state,
            actions: {
            receiveSeatSelectedInfo,
          },
        }}
      >
        {children}
      </BookingContext.Provider>
    );
  


    
  };

