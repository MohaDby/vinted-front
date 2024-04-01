import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import "./App.css";
import logo from "./assets/img/logoVinted.png";
import heroImg from "./assets/img/heroImg.jpg";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header
          logo={logo}
          token={token}
          handleToken={handleToken}
          loginModal={loginModal}
          setLoginModal={setLoginModal}
          signupModal={signupModal}
          setSignupModal={setSignupModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                heroImg={heroImg}
                token={token}
                setLoginModal={setLoginModal}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/publish"
            element={
              <Publish
                setLoginModal={setLoginModal}
                loginModal={loginModal}
                token={token}
                setToken={setToken}
              />
            }
          />
        </Routes>
        {signupModal && (
          <SignupModal
            setSignupModal={setSignupModal}
            setLoginModal={setLoginModal}
            handleToken={handleToken}
          />
        )}
        {loginModal && (
          <LoginModal
            setLoginModal={setLoginModal}
            setSignupModal={setSignupModal}
            handleToken={handleToken}
          />
        )}
      </Router>
    </>
  );
}

export default App;
