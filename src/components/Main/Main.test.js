import React from 'react';
import { render, screen } from '@testing-library/react';
import Main, { initializeTimes, updateTimes } from './Main'; // Ensure `initializeTimes` and `updateTimes` are exported for testing
import {useNavigate, useLocation} from 'react-router-dom';

// Mock `useNavigate` hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

// Mock global `fetchAPI` and `submitAPI` function
beforeAll(() => {
    window.fetchAPI = jest.fn();
    window.submitAPI = jest.fn();
});

afterAll(() => {
    delete window.fetchAPI;
    delete window.submitAPI;
});

describe('initializeTimes', () => {
    it('should call fetchAPI with the correct date and return available times', () => {
        const mockDate = new Date('2023-10-31T00:00:00.000Z');
        const mockAvailableTimes = ['12:00 PM', '12:30 PM', '1:00 PM'];

        // Mock fetchAPI to return mockAvailableTimes
        window.fetchAPI.mockReturnValue(mockAvailableTimes);

        // Call initializeTimes with a specific date
        const result = initializeTimes(mockDate);

        // Assertions
        expect(window.fetchAPI).toHaveBeenCalledWith(mockDate); // fetchAPI is called with the date
        expect(result).toEqual(mockAvailableTimes); // initializeTimes returns the available times
    });
});

describe('updateTimes', () => {
    it('should initialize available and booked slots when dispatching INITIALIZE_TIMES', () => {
        const state = {};
        const action = { type: 'INITIALIZE_TIMES', payload: '2023-10-31' };
        const mockAvailableTimes = ['12:00 PM', '12:30 PM'];

        window.fetchAPI.mockReturnValue(mockAvailableTimes);

        const newState = updateTimes(state, action);

        expect(newState['2023-10-31'].availableSlots).toEqual(mockAvailableTimes);
        expect(newState['2023-10-31'].bookedSlots).toEqual([]); // No booked slots initially
    });

    it('should update available and booked slots when dispatching BOOK_TIME', () => {
        const state = {
            '2023-10-31': {
                availableSlots: ['12:00 PM', '12:30 PM'],
                bookedSlots: [],
            },
        };
        const action = { type: 'BOOK_TIME', payload: { date: '2023-10-31', time: '12:00 PM' } };

        const newState = updateTimes(state, action);

        expect(newState['2023-10-31'].availableSlots).toEqual(['12:30 PM']); // 12:00 PM removed
        expect(newState['2023-10-31'].bookedSlots).toEqual(['12:00 PM']); // 12:00 PM added to booked
    });
});

describe('Main Component', () => {
    const mockNavigate = jest.fn();
    const mockLocation = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        useLocation.mockReturnValue(mockLocation);
    });

    it('should render main headings and reserve button', () => {
        render(<Main />);
        // Check if the main headings and reserve button are rendered
        expect(screen.getByText('Little Lemon')).toBeInTheDocument();
        expect(screen.getByText('Chicago')).toBeInTheDocument();
        expect(screen.getByText('Reserve a Table', {selector: 'button'})).toBeInTheDocument();
    });

    it('should initialize available times on first render', () => {
        render(<Main />);
        // Check if INITIALIZE_TIMES was dispatched on first render
        const today = new Date();
        today.setHours(1,0,0,0);
        expect(window.fetchAPI).toHaveBeenCalledWith(today);
    });
});
