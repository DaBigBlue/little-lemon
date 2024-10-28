import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    test('renders logo correctly', () => {
        render(<Header />);
        const logo = screen.getByAltText(/Little Lemon Logo/i);
        expect(logo).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
        render(<Header />);
        const links = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login'];
        links.forEach(linkText => {
            const linkElement = screen.getByText(new RegExp(linkText, 'i'));
            expect(linkElement).toBeInTheDocument();
        });
    });
});
