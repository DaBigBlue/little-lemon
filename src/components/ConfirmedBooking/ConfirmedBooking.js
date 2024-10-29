import "./ConfirmedBooking.css"
import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const ConfirmedBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="confirmation-container">
            <h2 className="confirmation-title">Booking Confirmed!</h2>
            <p className="confirmation-message">
                Thank you! Your table has been successfully reserved. We look forward to serving you at Little Lemon.
            </p>
            <button
                className="confirmation-button"
                onClick={() => navigate('/', {state: location.state})}
            >
                Back to Home
            </button>
        </div>
    );
};

export default ConfirmedBooking;
