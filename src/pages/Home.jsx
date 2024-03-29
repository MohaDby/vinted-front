import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Home = ({ heroImg }) => {
  console.log(Cookies.get("userToken"));
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
    <main>
      <div className="Hero">
        <img src={heroImg} alt="" />
        <div className="container">
          <div className="home-cards">
            {data.offers.map((offers) => {
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
                      {offers.product_details.map((detail, index) => {
                        return (
                          detail.TAILLE && (
                            <span key={index}>{detail.TAILLE}</span>
                          )
                        );
                      })}
                      {offers.product_details.map((detail, index) => {
                        return (
                          detail.MARQUE && (
                            <span key={index}>{detail.MARQUE}</span>
                          )
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

//<p>{offer.product_details[1].TAILLE}</p> <p>{offer.product_details[0].MARQUE}</p>
