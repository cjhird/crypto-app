import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1>Home page</h1>
      <Link to="/coinmenu">Coin Menu</Link>
    </>
  )
}
export default Home