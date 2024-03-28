import { useLocation, useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  let { state } = useLocation();

  console.log(state);
  return (
    <main className="mainOffer">
      <div className="container">
        <div className="offer">
          <img src={state.product_image.url} alt="" />
          <div className="offer-info">
            <div>
              <h2>{state.product_price}</h2>
              <ul>
                {state.product_details.map((elem) => {
                  return (
                    <li>
                      <span>{Object.keys(elem)}</span>
                      <span>{Object.values(elem)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2>{state.product_name}</h2>
              <p>{state.product_description}</p>
              <div className="offer-user">
                <img src={state.owner.account.avatar.url} alt="" />
                <span>{state.owner.account.username}</span>
              </div>
            </div>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </main>
  );
};

//faire une condition que si id n'existe oas dans l'api montrer une page blanche

export default Offer;
