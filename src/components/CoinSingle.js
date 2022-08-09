import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CoinNews from "./CoinNews";

// Import from bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'

const CoinSingle = () => {
  // ! Router Variables
  // /bread/1234
  // { breadId: 1234 }
  const { id } = useParams();

  // ! State
  const [bread, setBread] = useState(null);
  const [errors, setErrors] = useState(false);

  // https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true&community_data=false&developer_data=false

  // ! Execution
  // Dynamic coin api
  useEffect(() => {
    const getData = async () => {
      try {
        // console.log('DYNAMIC API RAN')
        // console.log(id)
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setBread(data);
        // console.log(data)
      } catch (err) {
        setErrors(true);
      }
    };
    getData();
  }, [id]);

  // ! JSX
  return (
    <Container as="main">
      <Row>
        {bread ? (
          // If bread is truthy, then our API call was successful as data has been added to the bread state
          <>
            <Row>
              <img className="w-100" src={bread.image.large} alt={bread.name} />
              <h1>{bread.name}</h1>
              <h1>{bread.symbol}</h1>
              <h1>Current Price -> ${bread.market_data.current_price.usd}</h1>
              <h1>Market Cap Rank -> {bread.market_cap_rank}</h1>
              <h1>Market Cap -> ${bread.market_data.market_cap.usd}</h1>
            </Row>
            <hr />
            <Row>
              <h1>Latest {bread.name} News</h1>
              <CoinNews symbol={bread.symbol} />
            </Row>
          </>
        ) : (
          // If bread is falsey, we are either still waiting for a response or there's been an error
          // TO check whether there has been an error, we check the truthy value of errors state
          <h2 className="text-center">
            {errors ? (
              "Something went wrong. Please try again later"
            ) : (
              <h2>Okay</h2>
            )}
          </h2>
        )}
      </Row>
    </Container>
  );
};
export default CoinSingle;
