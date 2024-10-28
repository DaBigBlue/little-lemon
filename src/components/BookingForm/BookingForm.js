import React, {useEffect, useState} from 'react';
import './BookingForm.css';

const BookingForm = ({ availableTimes, dispatch, onSubmit, setSelectedDate }) => {
    // State to hold form values
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 1,
        occasion: 'Birthday',
    });

    useEffect(() => {
        setFormData({
            ...formData,
            time: availableTimes[0],
        });
    }, [availableTimes]);

    // State to handle form submission status
    const [submitted, setSubmitted] = useState(false);

    // Handle change for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update times when the date changes
        if (name === 'date') {
            setSelectedDate(value); // Update selectedDate in BookingPage
            dispatch({ type: 'INITIALIZE_TIMES', payload: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log('Reservation submitted:', formData);

        // Call onSubmit with the selected time
        if (formData.time) {
            onSubmit(formData.date, formData.time);
        }
    };

    return (
        <div className="booking-form-container" role="form" aria-labelledby="booking-form-title">
            <h2 id="booking-form-title">Reserve a Table</h2>
            {submitted && (
                <p role="status" aria-live="polite" className="success-message">
                    Reservation submitted successfully!
                </p>
            )}
            <form onSubmit={handleSubmit} aria-describedby="form-instructions">
                {/* Form instructions */}
                <p id="form-instructions" className="visually-hidden">
                    Complete this form to reserve a table. All fields are required.
                </p>

                {/* Date Field */}
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date || new Date().toString()}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby="date-description"
                />
                <span id="date-description" className="visually-hidden">
          Select the date for your reservation.
        </span>

                {/* Time Field */}
                <label htmlFor="time">Time</label>
                <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby="time-description"
                    required>
                    <option value="" disabled>Select a time</option>
                    {availableTimes?.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <span id="time-description" className="visually-hidden">
          Select the time for your reservation.
        </span>

                {/* Number of Guests Field */}
                <label htmlFor="guests">Number of guests</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                    aria-required="true"
                    aria-describedby="guests-description"
                />
                <span id="guests-description" className="visually-hidden">
          Enter the number of guests, between 1 and 10.
        </span>

                {/* Occasion Field */}
                <label htmlFor="occasion">Occasion</label>
                <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby="occasion-description"
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                </select>
                <span id="occasion-description" className="visually-hidden">
          Select the occasion for your reservation.
        </span>

                {/* Submit Button */}
                <button type="submit" className="submit-form-btn" aria-label="Submit Reservation">
                    Submit Reservation
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
