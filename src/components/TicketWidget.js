import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import {ReactComponent as SeatImg} from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react/headless';


const TicketWidget = () => {
  // TODO: use values from Context

  const {
    state: {numOfRows, seatsPerRow, seats},
    actions: { receiveSeatInfoFromServer },
} = React.useContext(SeatContext);



  // const numOfRows = state.numOfRows;
  // const seatsPerRow = state.seatsPerRow;






  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Render the actual <Seat /> */
                    console.log("seatID isbooked" , seats[seatId].isBooked)
                  }

                  {
                    seats[seatId].isBooked ? (
                        <Seat 
                          seat={seats[seatId]} 
                          seatNum={getSeatNum(seatIndex)} 
                          rowName = {rowName}
                        
                        />   
                  ) : (
                    <Seat seat={seats[seatId]}/>

                  )}
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Seat = ({seat, seatNum, rowName}) => {

  const {
    state: {selectedSeatId, status},
    actions: { receiveSeatSelectedInfo },
  } = React.useContext(BookingContext);

  const handleClickSeat = (ev) => {
    console.log("seat is clicked");
    console.log(seat);

    let seatID = `${rowName}-${seatNum}`;


    receiveSeatSelectedInfo({selectedSeatId : seatID, price: seat.price});
  }

  return (

    <Tippy
      render={attrs => (
        <span style={{backgroundColor: "#000", width: '100'}}>
          Row {rowName} - Seat {seatNum} , {seat.price}$
        </span>
      )}
    >
    <button disabled={seat.isBooked ? true : false} onClick={(ev) => handleClickSeat(ev)}>
      <SeatImg style={seat.isBooked ? {
                      filter:  'grayscale(100%)',
                      } : {
                      filter: 'grayscale(0%)',
                      cursor: 'pointer'}}/>
    </button>
    </Tippy>                    
  );

};



const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  button{
    border: none;
  }

  button:focus{
    outline: none;
  }
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;



export default TicketWidget;
