// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const CoinMenu = () => {
  // ! State
  const [ breads, setBreads ] = useState([])
  const [ errors, setErrors ] = useState(false)

  // ! Executed
  useEffect(() => {
    // Get our bread data
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        // console.log(response)
        setBreads(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getData()
  }, [])

  // ! JSX
  return (
    <Container as="main" className='bread-index text-center'>
      <h1 className='text-center mb-4'>Bread</h1>
      <Row>
        { breads.length > 0
          ?
          breads.map(bread => {
            const { id, name, origin, image } = bread
            // console.log(bread)
            return (
              <Col key={id} md="6" lg="4" className='mb-4'>
                <Link to={`/coinmenu/${id}`}>
                  <Card>
                    <Card.Img variant='top' src={image}></Card.Img>
                    <Card.Body className='bg-light'>
                      <Card.Title className='text-center mb-0'>{name} - {id}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })
          :
          <>
            { errors ? <h2>Something went wrong. Please try again later</h2> : <h2>okay</h2>}
          </>
        }
      </Row>
    </Container>
  )
}

export default CoinMenu