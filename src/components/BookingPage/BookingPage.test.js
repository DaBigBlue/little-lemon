import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingPage from './BookingPage';

// Mock child components
jest.mock('../BookingForm/BookingForm', () => (props) => (
    <div data-testid="booking-form">
        BookingForm Component - {JSON.stringify(props)}
    </div>
));

jest.mock('../BookingSlot/BookingSlot', () => (props) => (
    <div data-testid="booking-slot" data-available={props.available}>
        {props.time}
    </div>
));

describe('BookingPage Component', () => {
    const mockAvailableTimes = {
        "2023-10-01": {
            availableSlots: ['12:00 PM', '12:30 PM', '1:00 PM'],
            bookedSlots: ['2:00 PM']
        },
    };

    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockSetSelectedDate = jest.fn();
    const mockSelectedDate = "2023-10-01";

    it('should render main headings and instructions', () => {
        render(
            <BookingPage
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).not.toBeNull();
        expect(heading.textContent).toBe('Book a Table');

        const instructions = screen.getByText(/We would love to host you at Little Lemon!/i);
        expect(instructions).not.toBeNull();
    });

    it('should render BookingForm component with correct props', () => {
        render(
            <BookingPage
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const bookingForm = screen.getByTestId('booking-form');
        expect(bookingForm).not.toBeNull();

        // Check that the props passed to BookingForm include availableTimes for the selected date
        expect(bookingForm.textContent).toContain(
            JSON.stringify({
                availableTimes: mockAvailableTimes[mockSelectedDate].availableSlots,
                dispatch: mockDispatch,
                selectedDate: mockSelectedDate,
                setSelectedDate: mockSetSelectedDate,
                submitForm: mockSubmitForm,
            })
        );
    });

    it('should render available slots when selectedDate has availableSlots', () => {
        render(
            <BookingPage
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const availableSlotsHeading = screen.getByRole('heading', { name: /Available Slots/i });
        expect(availableSlotsHeading).not.toBeNull();
        expect(availableSlotsHeading.textContent).toBe(`Available Slots for ${mockSelectedDate}`);

        // Check if each available slot is rendered
        mockAvailableTimes[mockSelectedDate].availableSlots.forEach((time) => {
            const slot = screen.getByText(time);
            expect(slot).not.toBeNull();
        });
    });

    it('should render booked slots when selectedDate has bookedSlots', () => {
        render(
            <BookingPage
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        const bookedSlotsHeading = screen.getByRole('heading', { name: /Booked Slots/i });
        expect(bookedSlotsHeading).not.toBeNull();

        // Check if each booked slot is rendered
        mockAvailableTimes[mockSelectedDate].bookedSlots.forEach((time) => {
            const slot = screen.getByText(time);
            expect(slot).not.toBeNull();
        });
    });

    it('should not render available slots if no availableSlots are present for selectedDate', () => {
        const updatedAvailableTimes = { "2023-10-01": { availableSlots: [], bookedSlots: [] } };
        render(
            <BookingPage
                availableTimes={updatedAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        expect(screen.queryByText('Available Slots for')).toBeNull();
    });

    it('should not render booked slots if no bookedSlots are present for selectedDate', () => {
        const updatedAvailableTimes = { "2023-10-01": { availableSlots: ['12:00 PM'], bookedSlots: [] } };
        render(
            <BookingPage
                availableTimes={updatedAvailableTimes}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
                selectedDate={mockSelectedDate}
                setSelectedDate={mockSetSelectedDate}
            />
        );

        expect(screen.queryByText('Booked Slots')).toBeNull();
    });
});
