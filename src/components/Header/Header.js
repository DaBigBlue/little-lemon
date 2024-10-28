import "./Header.css"
import Nav from "../Nav/Nav";
import logo from "../../assets/logo.png";

function Header() {
    return (
        <header className="header" role="banner">
            <img src={logo} alt="Little Lemon Logo" className="logo"/>
            <Nav/>
        </header>
);
}

export default Header;
