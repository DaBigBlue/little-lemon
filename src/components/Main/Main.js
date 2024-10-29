import "./Main.css"
import food from "../../assets/restaurantFood.jpg"
import Card from "../Card/Card";
import BookingPage from "../BookingPage/BookingPage";
import {useEffect, useReducer, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// Function to initialize available times
export const initializeTimes = (date) => {
    const isoDate = new Date(date);
    // eslint-disable-next-line no-undef
    return fetchAPI(isoDate);
};

// Reducer function to update available times based on selected date
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_TIMES': {
            const selectedDate = action.payload;
            const today = new Date();
            const availableTimes = selectedDate? initializeTimes(new Date(selectedDate)): initializeTimes(today)

            return {
                ...state,
                [selectedDate]: {
                    availableSlots: state[selectedDate]?.availableSlots ||availableTimes,
                    bookedSlots: state[selectedDate]?.bookedSlots || [],
                },
            };
        }

        case 'BOOK_TIME': {
            const { availableTimes, date, time } = action.payload;
            const { availableSlots, bookedSlots } = state[date] || availableTimes[date] || {
                availableSlots: (initializeTimes(new Date(date)) || []),
                bookedSlots: []
            };

            const newBooked = bookedSlots.includes(time) ? [...bookedSlots] : [...bookedSlots, time];
            return {
                ...state,
                [date]: {
                    availableSlots: availableSlots.filter((t) => t !== time),
                    bookedSlots: newBooked.sort(),
                },
            };
        }

        default:
            return state;
    }
};

const specials = [
    {
        name: "Greek Salad",
        price: "$12.99",
        description: `The famous Greek salad of crispy lettuce,
         peppers, olives, and our Chicago style feta cheese, 
         garnished with crunchy garlic and rosemary croutons.`,
        src: "./images/greek-salad.jpg"
    },
    {
        name: "Bruschetta",
        price: "$5.89",
        description: `Our Bruschetta is made from grilled
         bread that has been smeared with garlic and seasoned 
         with salt and olive oil.`,
        src: "./images/bruschetta.jpg"
    },
    {
        name: "Lemon Dessert",
        price: "$5.00",
        description: `This comes straight from grandma's 
        recipe book, every last ingredient has been sourced 
        and is as authentic as can be imagined.`,
        src: "./images/lemon-dessert.jpg"
    },

]

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, {});
    const [selectedDate, setSelectedDate] = useState(null); // Track the currently selected date

    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle form submission
    const submitForm = (formData) => {
        // eslint-disable-next-line no-undef
        if (submitAPI(formData)) {
            navigate('/confirmed', { state: { availableTimes: availableTimes, date: formData.date, time: formData.time } }); // Navigate to the confirmation page if successful
        } else {
            alert('Submission failed. Please try again.'); // Handle failed submission (optional)
        }
    };

    // Initialize available times for today's date on first render
    useEffect(() => {
        if (!location.state) {
            const today = new Date().toISOString().split('T')[0];
            dispatch({ type: 'INITIALIZE_TIMES', payload: today });
            setSelectedDate(today);
        } else {
            dispatch({ type: 'BOOK_TIME', payload: { availableTimes: location.state.availableTimes, date: location.state.date, time: location.state.time } });
            setSelectedDate(location.state.date);
            window.history.replaceState({}, '')
        }
    }, []);

    function handleClick() {
        navigate('/#booking', {state: location.state});
    }

    return (
        <main>
            <div className="promo">
                <div className="promo-background"></div>
                <section className="restaurant-info" aria-labelledby="restaurant-heading" id="about">
                    <h1 id="restaurant-heading">Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes
                        served with a modern twist.
                    </p>
                    <button className="reserve-btn" aria-label="Reserve a Table" onClick={handleClick}>Reserve a Table</button>
                </section>
                <img src={food} alt="" role="presentation"/>
            </div>


            <section className="specials" aria-labelledby="specials-heading" id="menu">
                <header>
                    <h1 id="specials-heading">This week's specials!</h1>
                    <button className="online-menu-btn" aria-label="View Online Menu">Online Menu</button>
                </header>
                <main className="specials-items" role="list">
                    {specials.map((special) => <Card {...special} key={special.name}/>)}
                </main>
            </section>
            <section className="booking-section" id="booking">
                <BookingPage
                    availableTimes={availableTimes}
                    dispatch={dispatch}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    submitForm={submitForm}/>
            </section>
        </main>
    );
}

export default Main;
