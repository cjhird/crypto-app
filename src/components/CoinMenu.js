// Import Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const CoinMenu = () => {
  // ! State
  const [coins, setCoins] = useState([]);
  const [errors, setErrors] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  // ! Executed
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    //This useEffect will trigger when the countries are loaded and when a user updates one of the filters
    //So if search or region dropdown is updated, this will trigger and update the filteredCountries state
    const regexSearch = new RegExp(search, "i");
    const filteredArray = coins.filter((money) => {
      return regexSearch.test(money.name);
    });
    setFilteredCoins(filteredArray);

    // console.log('filteredArray->', filteredArray)
  }, [search, coins]);

  useEffect(() => {
    // Get our bread data
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        // console.log(response)
        setCoins(data);
      } catch (err) {
        console.log(err);
        setErrors(true);
      }
    };
    getData();
    setInterval(getData, 1000 * 60 * 5);
  }, []);

  // ! JSX
  return (
    <Container as="main" className="coin-index text-center">
      <div className="text-center mb-5 mt-5">
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          placeholder="Search"
        />
      </div>
      <Row>
        <Table striped bordered hover variant="dark" className="col-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          {filteredCoins.length > 0 ? (
            <tbody>
              {filteredCoins.map((coin) => {
                const {
                  id,
                  name,
                  image,
                  symbol,
                  market_cap_rank,
                  market_cap,
                  current_price,
                } = coin;
                return (
                  <tr>
                    <td className="col-1">{market_cap_rank}</td>
                    <td className="col-3 text-start">
                      <img className="col-1" src={image} alt={name} />
                      {name}{" "}
                      <span className="text-muted">{symbol.toUpperCase()}</span>
                    </td>
                    <td className="col-1 text-end">${current_price}</td>
                    <td
                      className={`col-1 text-end 
                        ${
                          coin.price_change_percentage_24h > 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                    >
                      {coin.price_change_percentage_24h > 0 ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="col-2 text-end">
                      ${market_cap.toLocaleString("en-US")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <>
              {errors ? (
                <h2>Something went wrong. Please try again later</h2>
              ) : (
                <h2>Loading...</h2>
              )}
            </>
          )}
        </Table>
      </Row>
    </Container>
  );
};

export default CoinMenu;
