import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <main className="mainOffer">
      <div className="container">
        <div className="offer">
          <img src={data.product_image.url} alt="" />
          <div className="offer-info">
            <div>
              <h2>{data.product_price}</h2>
              <ul>
                {data.product_details.map((elem, index) => {
                  return (
                    <li key={index}>
                      <span>{Object.keys(elem)}</span>
                      <span>{Object.values(elem)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2>{data.product_name}</h2>
              <p>{data.product_description}</p>
              <div className="offer-user">
                <img src={data.owner.account.avatar.url} alt="" />
                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
