import React, {useEffect, useState} from 'react';
import './BookingForm.css';

const BookingForm = ({ availableTimes, dispatch, submitForm, selectedDate, setSelectedDate }) => {
    // State to hold form values
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 1,
        occasion: 'Birthday',
    });

    // State to manage form errors and overall validity
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setFormData({
            date: selectedDate,
            time: availableTimes[0],
            guests: 1,
            occasion: 'Birthday',
        });
    }, [selectedDate, availableTimes]);

    // Check if form is valid
    useEffect(() => {
        const formIsValid = formData.date && formData.time && formData.guests >= 1 && formData.guests <= 10;
        setIsFormValid(formIsValid);
    }, [formData]);

    // Handle change for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        validateField(name, value); // Validate field on change

        // Update times when the date changes
        if (name === 'date') {
            setSelectedDate(value); // Update selectedDate in BookingPage
            dispatch({ type: 'INITIALIZE_TIMES', payload: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            submitForm(formData);
        } else {
            alert('Please fill in all fields correctly.');
        }
    };

    // Field validation
    const validateField = (name, value) => {
        let message = '';

        if (name === 'date') {
            const today = new Date().toISOString().split('T')[0];
            if (value < today) message = 'Date must be today or in the future.';
        }

        if (name === 'guests') {
            if (value < 1 || value > 10) message = 'Guests must be between 1 and 10.';
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: message,
        }));
    };

    return (
        <div className="booking-form-container" role="form" aria-labelledby="booking-form-title">
            <h2 id="booking-form-title">Reserve a Table</h2>
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
                    min={new Date().toISOString().split('T')[0]} // Ensure the date is today or later
                    style={{ marginBottom: errors.date ? '0px': '24px'}}
                />
                <span id="date-description" className="visually-hidden">
                    Select the date for your reservation.
                </span>

                {errors.date && <p className="error-message">{errors.date}</p>}

                {/* Time Field */}
                <label htmlFor="time">Time</label>
                <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby="time-description"
                    style={{ marginBottom: errors.time ? '0px': '24px'}}
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
                    style={{ marginBottom: errors.guests ? '0px': '24px'}}
                />
                <span id="guests-description" className="visually-hidden">
                    Enter the number of guests, between 1 and 10.
                </span>

                {errors.guests && <p className="error-message">{errors.guests}</p>}

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
                    style={{ marginBottom: errors.occasion ? '0px': '24px'}}
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                </select>
                <span id="occasion-description" className="visually-hidden">
          Select the occasion for your reservation.
        </span>

                {/* Submit Button */}
                {/* Disable if form is invalid */}
                <button
                    type="submit"
                    className="submit-form-btn"
                    aria-label="Submit Reservation"
                    disabled={!isFormValid}>
                    Submit Reservation
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
