import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookingPage from "./components/BookingPage/BookingPage";

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/booking" element={<BookingPage />} /> {/* Add route for booking page */}
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
