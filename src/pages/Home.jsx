import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tear from "../assets/img/tear.88.svg";
import heroImg from "../assets/img/heroImg.jpg";

import axios from "axios";

const Home = ({ token, setLoginModal }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=8`
        );
        setData(response.data.offers);

        setTotalPages(Math.ceil(response.data.count / 8));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [page]);

  return isLoading ? (
    <p>En cours de chargement....</p>
  ) : (
    <main>
      <div className="home">
        <div className="hero">
          <img src={heroImg} alt="hero-img" />
          <img src={tear} alt="" className="hero-tear" />
          <div className="hero-div">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button
              onClick={() => {
                if (!token) {
                  setLoginModal(true);
                } else {
                  navigate("/publish");
                }
              }}
            >
              Commencer a vendre
            </button>
          </div>
        </div>
        <div className="container">
          <div className="home-cards">
            {data.map((offers) => {
              return (
                <Link key={offers._id} to={`/offer/${offers._id}`}>
                  <div className="card">
                    <div className="user">
                      <img src={offers.owner.account.avatar?.url} alt="" />
                      <span>{offers.owner.account.username}</span>
                    </div>
                    <img src={offers.product_image.secure_url} alt="" />
                    <div className="details">
                      <span>{offers.product_price} €</span>
                      <p>{offers.product_details[1].TAILLE}</p>
                      <p>{offers.product_details[0].MARQUE}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pages-buttons">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Page précédente
            </button>
            <span>
              Page {page} sur {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Page suivante
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
