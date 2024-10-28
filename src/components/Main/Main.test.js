import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main Component', () => {
    test('renders restaurant name and location', () => {
        render(<Main />);
        expect(screen.getByText(/Little Lemon/i)).toBeInTheDocument();
        expect(screen.getByText(/Chicago/i, { selector: 'h2' })).toBeInTheDocument();
    });

    test('renders restaurant description', () => {
        render(<Main />);
        const description = screen.getByText(/We are a family owned Mediterranean restaurant/i);
        expect(description).toBeInTheDocument();
    });

    test('renders "This week\'s specials!" section', () => {
        render(<Main />);
        const specialsTitle = screen.getByText(/This week's specials!/i);
        expect(specialsTitle).toBeInTheDocument();
    });
});
