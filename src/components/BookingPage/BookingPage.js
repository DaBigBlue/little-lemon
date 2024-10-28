import './BookingPage.css';
import React, {useReducer, useState} from 'react';
import BookingForm from '../BookingForm/BookingForm';
import BookingSlot from "../BookingSlot/BookingSlot";

// Function to initialize available times
const initializeTimes = () => [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

// Reducer function to update available times based on selected date
const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_TIMES': {
            const selectedDate = action.payload;

            const initialTimes = initializeTimes();

            return {
                ...state,
                [selectedDate]: {
                    availableSlots: state[selectedDate]?.availableSlots ||initialTimes,
                    bookedSlots: state[selectedDate]?.bookedSlots || [],
                },
            };
        }

        case 'BOOK_TIME': {
            const { date, time } = action.payload;
            const { availableSlots, bookedSlots } = state[date] || { availableSlots: [], bookedSlots: [] };

            return {
                ...state,
                [date]: {
                    availableSlots: availableSlots.filter((t) => t !== time),
                    bookedSlots: [...bookedSlots, time],
                },
            };
        }

        default:
            return state;
    }
};

const BookingPage = () => {
    const [availableTimes, dispatch] = useReducer(bookingReducer, {});
    const [selectedDate, setSelectedDate] = useState(null); // Track the currently selected date

    // Function to handle reservation submission
    const handleReservationSubmit = (selectedDate, selectedTime) => {
        dispatch({ type: 'BOOK_TIME', payload: { date: selectedDate, time: selectedTime } });
    };

    return (
        <div className="booking-page-container">
            <h1>Book a Table</h1>
            <p>We would love to host you at Little Lemon! Please fill out the form below to reserve your table.</p>

            <div className="two-row">
                {/* BookingForm component */}
                <BookingForm
                    availableTimes={availableTimes[selectedDate]?.availableSlots || []}
                    dispatch={dispatch}
                    onSubmit={handleReservationSubmit}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                <div className="slots-container">
                    {selectedDate && availableTimes[selectedDate]?.availableSlots.length > 0 && (
                        <div className="available-slots-container">
                            {/* Available and Booked Slots */}
                            <h2>Available Slots for {selectedDate}</h2>
                            {availableTimes[selectedDate]?.availableSlots.map((time) => (
                                <BookingSlot key={time} time={time} available/>
                            ))}
                        </div>
                    )}

                    {selectedDate && availableTimes[selectedDate]?.bookedSlots.length > 0 && (
                        <div className="booked-slots-container">
                            <h2>Booked Slots</h2>
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
