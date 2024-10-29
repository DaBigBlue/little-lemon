import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ConfirmedBooking from "./components/ConfirmedBooking/ConfirmedBooking";
import ScrollToAnchor from "./Utils/ScrollToAnchor";

function App() {
  return (
      <Router>
          <ScrollToAnchor />
          <div className="App">
              <Header />
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/confirmed" element={<ConfirmedBooking />} /> {/* Confirmation route */}
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
