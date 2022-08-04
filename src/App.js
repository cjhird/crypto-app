import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import components
import PageNavbar from './components/PageNavbar'
import Home from './components/Home'
import CoinMenu from './components/CoinMenu'
import CoinSingle from './components/CoinSingle'
import NotFound from './components/NotFound'


function App() {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coinmenu" element={<CoinMenu/>} />
          <Route path="/coinmenu/:id" element={<CoinSingle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
