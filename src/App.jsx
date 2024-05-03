import { Provider } from 'react-redux'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import CategoryProduct from './pages/Home/Components/CategoryProducts/CategoryProducts'
import Slider from './pages/Home/Components/Slider'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import Profile from './pages/Profile/Profile'
import store from './Store'
// import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Admin from './pages/admin/Admin'
import { Routes,Route } from 'react-router-dom'
import Cancel from './pages/Cancel/Cancel'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import PrivateRouteuser from './Components/PrivateRoute'
import Checkout from './pages/Checkout/Checkout'
import Success from './pages/Success/Success'
import AdminLogin from './pages/adminauth/adminlogin'

function App() {

  return (
    <div style={{backgroundColor:"#E2E4EB",display:"flex",flexDirection:"column",gap:"1rem"}}>
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='' element={<PrivateRouteuser />}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signin" element={<Login />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

        <Route path='/category/:id' element={<CategoryProduct />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
  </Provider>
    </div>
  )
}

export default App
