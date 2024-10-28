import React from 'react';
import './BookingSlot.css';

const BookingSlot = ({ time, available }) => {
    return (
        <div className={`booking-slot ${available ? 'available' : 'booked'}`}
             role="listitem"
             aria-label={`${time} - ${available ? 'Available' : 'Booked'}`}>
            <span className="status" aria-live="polite">{time}</span>
            {available ? <span className="status available-status">Available</span> : <span className="status booked-status">Booked</span>}
        </div>
    );
};

export default BookingSlot;
