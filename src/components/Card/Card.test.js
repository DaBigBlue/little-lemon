import {render, screen} from "@testing-library/react";
import Main from "../Main/Main";
import React from "react";

describe('Card Component', () => {

    test('renders each special item with correct title and price', () => {
        render(<Main />);
        const specials = [
            { name: 'Greek Salad', price: /\$12\.99/ },
            { name: 'Bruschetta', price: /\$5\.89/ },
            { name: 'Lemon Dessert', price: /\$5\.00/ },
        ];
        specials.forEach(({ name, price }) => {
            expect(screen.getByText(new RegExp(name, 'i'), { selector: 'h3' })).toBeInTheDocument();
            expect(screen.getByText(price)).toBeInTheDocument();
        });
    });

    test('renders "Order a delivery" link for each special', () => {
        render(<Main />);
        const orderLinks = screen.getAllByText(/Order a delivery/i);
        expect(orderLinks.length).toBe(3); // Ensure there are 3 links for 3 specials
    });
});
