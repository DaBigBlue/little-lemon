import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
    test('renders the form fields', () => {
        render(<BookingForm />);

        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    });

    test('can fill out and submit the form', () => {
        render(<BookingForm />);

        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-10-15' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:30' } });
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Anniversary' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Reservation/i }));

        expect(screen.getByText(/Reservation submitted successfully!/i)).toBeInTheDocument();
    });
});
