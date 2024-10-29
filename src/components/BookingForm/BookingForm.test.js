import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

// Mock props
const mockAvailableTimes = ['12:00 PM', '12:30 PM'];
const mockSubmitForm = jest.fn();
const mockDispatch = jest.fn();
const mockSetSelectedDate = jest.fn();

describe('BookingForm Component', () => {

    it('should render the form elements correctly', () => {
        // Render BookingForm with mock props
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                submitForm={mockSubmitForm}
                dispatch={mockDispatch}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        // Check if all form elements are rendered
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit Reservation/i })).toBeInTheDocument();
    });

    it('should display available times in the time dropdown', () => {
        // Render BookingForm with mock props
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                submitForm={mockSubmitForm}
                dispatch={mockDispatch}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        // Check if the time options are rendered based on availableTimes prop
        const timeSelect = screen.getByLabelText(/Time/i);
        fireEvent.click(timeSelect);

        mockAvailableTimes.forEach((time) => {
            expect(screen.getByText(time)).toBeInTheDocument();
        });
    });

    it('should call setSelectedDate and dispatch when date is changed', () => {
        // Render BookingForm with mock props
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                submitForm={mockSubmitForm}
                dispatch={mockDispatch}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const dateInput = screen.getByLabelText(/Date/i);
        fireEvent.change(dateInput, { target: { value: '2023-11-01' } });

        // Verify setSelectedDate and dispatch were called
        expect(mockSetSelectedDate).toHaveBeenCalledWith('2023-11-01');
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'INITIALIZE_TIMES', payload: '2023-11-01' });
    });

    it('should call submitForm with form data when submitted', () => {
        // Render BookingForm with mock props
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                submitForm={mockSubmitForm}
                dispatch={mockDispatch}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const dateInput = screen.getByLabelText(/Date/i);
        const timeSelect = screen.getByLabelText(/Time/i);
        const guestsInput = screen.getByLabelText(/Number of guests/i);
        const occasionSelect = screen.getByLabelText(/Occasion/i);
        const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });

        // Fill out the form
        fireEvent.change(dateInput, { target: { value: '2023-10-31' } });
        fireEvent.change(timeSelect, { target: { value: '12:00 PM' } });
        fireEvent.change(guestsInput, { target: { value: '4' } });
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        // Submit the form
        fireEvent.click(submitButton);

        // Check if submitForm was called with correct form data
        expect(mockSubmitForm).toHaveBeenCalledWith({
            date: '2023-10-31',
            time: '12:00 PM',
            guests: '4',
            occasion: 'Birthday',
        });
    });
});

describe('BookingForm HTML5 Validation', () => {
    const mockAvailableTimes = ['12:00 PM', '1:00 PM', '2:00 PM'];
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockSetSelectedDate = jest.fn();

    it('should apply required attribute to date input', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const dateInput = screen.getByLabelText(/Date/i);
        expect(dateInput).toBeRequired();
        expect(dateInput).toHaveAttribute('min', new Date().toISOString().split('T')[0]); // Check min attribute for today or later
    });

    it('should apply required attribute to time select', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const timeSelect = screen.getByLabelText(/Time/i);
        expect(timeSelect).toBeRequired();
    });

    it('should apply min and max attributes to guests input', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const guestsInput = screen.getByLabelText(/Number of guests/i);
        expect(guestsInput).toHaveAttribute('min', '1');
        expect(guestsInput).toHaveAttribute('max', '10');
        expect(guestsInput).toBeRequired();
    });

    it('should apply required attribute to occasion select', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const occasionSelect = screen.getByLabelText(/Occasion/i);
        expect(occasionSelect).toBeRequired();
    });
});

describe('BookingForm JavaScript Validation', () => {
    const mockAvailableTimes = ['12:00 PM', '1:00 PM'];
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockSetSelectedDate = jest.fn();

    it('should disable submit button if form is invalid', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
        expect(submitButton).toBeDisabled();

        // Make form valid by filling all required fields
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-31' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '12:00 PM' } });
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: 4 } });
        fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });

        // Now the button should be enabled
        expect(submitButton).toBeEnabled();
    });

    it('should display error for invalid date selection', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const dateInput = screen.getByLabelText(/Date/i);
        const errorMessage = "Date must be today or in the future.";

        // Set an invalid date (past date)
        fireEvent.change(dateInput, { target: { value: '2022-01-01' } });

        // Check for error message
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should display error for invalid guests number', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const guestsInput = screen.getByLabelText(/Number of guests/i);
        const errorMessage = "Guests must be between 1 and 10.";

        // Set invalid guests number (more than 10)
        fireEvent.change(guestsInput, { target: { value: 11 } });

        // Check for error message
        expect(screen.getByText(errorMessage)).toBeInTheDocument();

        // Set another invalid guests number (less than 1)
        fireEvent.change(guestsInput, { target: { value: 0 } });

        // Check for error message again
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should call submitForm with correct data when form is valid', () => {
        render(
            <BookingForm
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate="2023-10-31"
                setSelectedDate={mockSetSelectedDate}
            />
        );

        // Fill in the form with valid data
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-31' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '12:00 PM' } });
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: 4 } });
        fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
        fireEvent.click(submitButton);

        // Check if submitForm was called with correct data
        expect(mockSubmitForm).toHaveBeenCalledWith({
            date: '2023-10-31',
            time: '12:00 PM',
            guests: "4",
            occasion: 'Birthday',
        });
    });
});
