import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import logo from "./assets/img/logoVinted.png";
import heroImg from "./assets/img/heroImg.jpg";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header logo={logo} />
        <Routes>
          <Route path="/" element={<Home heroImg={heroImg} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
