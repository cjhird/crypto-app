// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

const CoinMenu = () => {
  // ! State
  const [coins, setCoins] = useState([])
  const [errors, setErrors] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredCoins, setFilteredCoins] = useState([])

  // ! Executed
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    //This useEffect will trigger when the countries are loaded and when a user updates one of the filters
    //So if search or region dropdown is updated, this will trigger and update the filteredCountries state
    const regexSearch = new RegExp(search, 'i')
    const filteredArray = coins.filter((money) => {
      return regexSearch.test(money.name)
    })
    setFilteredCoins(filteredArray)

    // console.log('filteredArray->', filteredArray)
  }, [search, coins])

  useEffect(() => {
    // Get our bread data
    const getData = async () => {
      try {
        const { data } = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
        // console.log(response)
        setCoins(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getData()
    setInterval(getData, 1000 * 60 * 5)
  }, [])

  // ! JSX
  return (
    <Container id="coin-menu-cont" as="main" className="coin-index text-center">
      <div id="search-div">
        <p>Search any coin and click for more info</p>
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          placeholder=" 🔍  Search..."
        />
      </div>
      <Row>
        <Table id="coin-title" hover variant="dark" className="col-3 mb-0">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col-3 text-start">Coin</th>
              <th className="col-1 text-end">Price</th>
              <th className="col-1 text-end">24h</th>
              <th className="col-2 text-center">Market Cap</th>
            </tr>
          </thead>
        </Table>
        <Table id="coin-table" hover variant="dark" className="col-3 mt-0">
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
                  price_change_percentage_24h,
                } = coin

                return (
                  <tr key={id} id="table-row" className="mb-5 mt-5">
                    <td className="col-1 text-center">{market_cap_rank}</td>

                    <td className="col-3 text-start">
                      <Link
                        className="text-decoration-none text-white"
                        to={`/coinmenu/${id}`}
                      >
                        <img
                          id="coin-icon"
                          className="col-1"
                          src={image}
                          alt={name}
                        />
                        {` ${name} `}
                        <span className="text-muted">
                          {symbol.toUpperCase()}
                        </span>
                      </Link>
                    </td>
                    <td className="col-1 text-end">${current_price}</td>
                    <td
                      className={`col-1 text-end 
                        ${
                          price_change_percentage_24h > 0
                            ? 'text-success'
                            : 'text-danger'
                        }`}
                    >
                      {price_change_percentage_24h > 0 ? '+' : ''}
                      {price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="col-2 text-end">
                      ${market_cap.toLocaleString('en-US')}
                    </td>
                  </tr>
                )
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
  )
}

export default CoinMenu
