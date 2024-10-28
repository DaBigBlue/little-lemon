import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    test('renders footer text', () => {
        render(<Footer />);
        const footerText = screen.getByText(/© 2024 Little Lemon. All rights reserved./i);
        expect(footerText).toBeInTheDocument();
    });
});
