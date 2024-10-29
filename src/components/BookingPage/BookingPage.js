import './BookingPage.css';
import React from 'react';
import BookingForm from '../BookingForm/BookingForm';
import BookingSlot from "../BookingSlot/BookingSlot";

const BookingPage = ({ availableTimes, dispatch, submitForm, selectedDate, setSelectedDate }) => {
    return (
        <div className="booking-page-container">
            <h1>Book a Table</h1>
            <p>We would love to host you at Little Lemon! Please fill out the form below to reserve your table.</p>

            <div className="two-row">
                {/* BookingForm component */}
                <BookingForm
                    availableTimes={availableTimes[selectedDate]?.availableSlots || []}
                    dispatch={dispatch}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    submitForm={submitForm} // Pass submitForm to BookingForm
                />

                <div className="slots-container">
                    {selectedDate && (availableTimes[selectedDate]?.availableSlots || []).length > 0 && (
                        <div className="available-slots-container"
                             aria-labelledby="available-slots-heading"
                             role="list">
                            {/* Available and Booked Slots */}
                            <h2 id="available-slots-heading">Available Slots for {new Date(selectedDate).toLocaleDateString()}</h2>
                            {availableTimes[selectedDate]?.availableSlots.map((time) => (
                                <BookingSlot key={time} time={time} available/>
                            ))}
                        </div>
                    )}

                    {selectedDate && (availableTimes[selectedDate]?.bookedSlots || []).length > 0 && (
                        <div className="booked-slots-container" aria-labelledby="booked-slots-heading"
                             role="list">
                            <h2 id="booked-slots-heading">Booked Slots</h2>
                            {availableTimes[selectedDate].bookedSlots.map((time) => (
                                <BookingSlot key={time} time={time} available={false}/>
                            ))}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
