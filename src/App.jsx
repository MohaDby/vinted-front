import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import "./App.css";
import logo from "./assets/img/logoVinted.png";
import heroImg from "./assets/img/heroImg.jpg";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };
  console.log(token);
  return (
    <>
      <Router>
        <Header logo={logo} token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home heroImg={heroImg} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
