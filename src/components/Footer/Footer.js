import "./Footer.css"
import logo_small from "../../assets/logo_small.png"

function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <img src={logo_small} alt="Small Little Lemon Logo" />
            <p>&copy; 2024 Little Lemon. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
