import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ heroImg }) => {
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
                <Link to={`/offer/${offers._id}`}>
                  <div key={offers._id} className="card">
                    <div className="user">
                      <img src={offers.owner.account.avatar?.url} alt="" />
                      <span>{offers.owner.account.username}</span>
                    </div>
                    <img src={offers.product_image.secure_url} alt="" />
                    <div className="details">
                      <span>{offers.product_price} €</span>
                      {offers.product_details.map((detail) => {
                        return detail.TAILLE && <span>{detail.TAILLE}</span>;
                      })}
                      {offers.product_details.map((detail) => {
                        return detail.MARQUE && <span>{detail.MARQUE}</span>;
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

// {console.log(offers.product_details[0])}
