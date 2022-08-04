import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'

import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'


const CoinNews = ({ symbol }) => {

  // !
  const [ news, setNews ] = useState([])
  const [ newsErr, setNewsErr ] = useState(false)

  // https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:xrp&time_from=20220410T0130&limit=55&apikey=7FVRLQDMZWW3RN11

  // ! Execution
  useEffect(() => {
    // Get our bread data
    const getNews = async () => {
      try {
        const { data } = await axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:btc&time_from=20220410T0130&limit=55&apikey=7FVRLQDMZWW3RN11')
        // console.log(response)
        setNews(data)
        console.log(data)
      } catch (err) {
        console.log(err)
        setNewsErr(true)
      }
    }
    getNews()
  }, [])

  // ! JSX 
  return (
    <Container>
      <h1>NEWS API SYMBOL ->, {symbol}</h1>
      <br />
      <Row>
        {
          news.feed.forEach(article => {
            const { title } = article
            console.log(article)
          })
        }
      </Row>
    </Container>
  )
}

export default CoinNews