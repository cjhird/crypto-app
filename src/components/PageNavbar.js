// Import Link
import { Link } from 'react-router-dom'

// Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const PageNavbar = () => {
  // ! JSX
  return (
    <Navbar expand="sm" className="justify-content-center">
      <Container as="section">
        {/* Navbar brand */}
        {/* Wherever you use a href on a bootstrap component, replace it with an as={Link} and a to="/pathname" */}
        <Navbar.Brand as={Link} to="/">
          📈🪙📉 Crypto Tracker
        </Navbar.Brand>
        {/* Navbar Toggle is our mobile burger icon - this is displayed at a breakpoint specified on the Navbar component above */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar collapse is our menu wrapped in a collapsible container for mobile */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* Nav Link is an individual link inside a nav. Same as Nav Brand, to use Link add as={Link} and to="/pathname" */}
          <Nav.Link as={Link} to="/coinmenu">
            Coin Menu
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar
