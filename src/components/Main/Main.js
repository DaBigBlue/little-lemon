import "./Main.css"
import food from "../../assets/restaurantFood.jpg"
import Card from "../Card/Card";

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
    return (
        <main>
            <div className="promo">
                <div className="promo-background"></div>
                <section className="restaurant-info" aria-labelledby="restaurant-heading">
                    <h1 id="restaurant-heading">Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes
                        served with a modern twist.
                    </p>
                    <button className="reserve-btn" aria-label="Reserve a Table">Reserve a Table</button>
                </section>
                <img src={food} alt="" role="presentation"/>
            </div>


            <section className="specials" aria-labelledby="specials-heading">
                <header>
                    <h1 id="specials-heading">This week's specials!</h1>
                    <button className="online-menu-btn" aria-label="View Online Menu">Online Menu</button>
                </header>
                <main className="specials-items" role="list">
                    {specials.map((special) => <Card {...special} key={special.name}/>)}
                </main>
            </section>
        </main>
    );
}

export default Main;
