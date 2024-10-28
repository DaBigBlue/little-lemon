import React from 'react';
import './BookingSlot.css';

const BookingSlot = ({ time, available }) => {
    return (
        <div className={`booking-slot ${available ? 'available' : 'booked'}`}>
            <span>{time}</span>
            {available ? <span className="status available-status">Available</span> : <span className="status booked-status">Booked</span>}
        </div>
    );
};

export default BookingSlot;
