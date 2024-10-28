import "./Card.css"

function Card(props) {
    return (
        <div className="special-item" role="listitem" aria-labelledby={`${props.name}-title`}>
            <img src={props.src} alt={props.name}/>
            <section className="special-item-content">
                <h3 id={`${props.name}-title`}>{props.name} <span data-testid="price">{props.price}</span></h3>
                <p>
                    {props.description}
                </p>
            </section>
            <div className="spacer"></div>
            <a href="#order" className="order-link" aria-label={`Order ${props.name} for delivery`}>Order a delivery 🛵</a>
        </div>
    );
}

export default Card
