import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders Header, Main, and Footer components', () => {
        render(<App />);

        // Check if elements from each component are rendered in the App
        expect(screen.getByAltText(/^Little Lemon Logo/i)).toBeInTheDocument(); // From Header
        expect(screen.getByText(/Little Lemon/i, {selector: 'h1'})).toBeInTheDocument(); // From Main
        expect(screen.getByText(/© 2024 Little Lemon. All rights reserved./i)).toBeInTheDocument(); // From Footer
    });
});
