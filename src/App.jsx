import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Emergency from './pages/Emergency'
import Area from './pages/Area'
import Cart from './pages/Cart'
import Commercial from './pages/Commercial'
import Comproductdetail from './pages/Comproductdetail'
import CommercialProduct from './pages/CommercialProduct'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import { AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/commercial' element={<Commercial />} />
            <Route path='/commercialproduct' element={<CommercialProduct />}/>
            <Route path='/commercialproduct/:id' element={<Comproductdetail />}/>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Account />} />
            <Route path='/emergency' element={<Emergency />} />
            <Route path='/signup' element={<Area />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
