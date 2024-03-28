import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import logo from "./assets/img/logoVinted.png";
import heroImg from "./assets/img/heroImg.jpg";

import Home from "./pages/Home";
import Offer from "./pages/Offer";

import Header from "./components/Header";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement....</p>
  ) : (
    <>
      <Router>
        <Header logo={logo} />
        <Routes>
          <Route
            path="/"
            element={<Home heroImg={heroImg} data={data} setData={setData} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
