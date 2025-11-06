// import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import NavOmKudrat from './components/Navbar'
import HeroSection from './components/home/HeroSection';
import BenefitsSection from "./components/home/BenefitsSection";
import Products from "./components/Products";
import OrganicBlends from "./components/home/OrganicBlends";
import BestSellingProducts from "./components/home/BestSellingProducts";
import BlackFridayOffer from "./components/home/BlackFridayOffer";
import TrendingProducts from "./components/home/TrendingProducts";
import Testimonial from "./components/home/Testimonial";
import OurBlog from "./components/home/OurBlog";
import ExclusiveOffer from "./components/home/ExclusiveOffer";
import Footer from "./components/Footer";
import Register from "./components/authentication/Register";
import Login from './components/authentication/Login';
import VerifyEmail from './components/authentication/VerifyEmail';
import VerifyCodeFalse from './components/authentication/VerifyCodeFalse';
import Boxes from './components/home/Boxes';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { ToastContainer } from 'react-toastify';
import VerifyCodeTrue from './components/authentication/VerifyCodeTrue';
import ResetPassword from './components/authentication/ResetPassword';
import SingleProduct from './components/SingleProduct';
import MoveOnTop from './components/MoveOnTop';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CartDetails from './components/CartDetails';
import Checkout from './components/Checkout';
import Place_Order from './components/Place_Order';
import Wishlist from './components/Wishlist';
import Success_Payment from './components/Success_Payment';
import Payment_Failed from './components/Payment_Failed';
import FAQS from './components/FAQS';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';

function App() {

  return (
    <>
      <ToastContainer />
      <MoveOnTop />
      <NavOmKudrat />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-code-false/:email' element={<VerifyCodeFalse />} />
        <Route path='/verify-code-true/:id' element={<VerifyCodeTrue />} />
        <Route path='/reset-password/:id' element={<ResetPassword />} />
        <Route path='/home' element={<Navigate to="/" />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/cart-details' element={<CartDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/place-order' element={<Place_Order />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/success-payment' element={<Success_Payment />} />
        <Route path='/failed-payment' element={<Payment_Failed />} />
        <Route path='/faqs' element={<FAQS />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
      </Routes>


      {/* <Register/> */}
      {/* <Login/> */}
      {/* <VerifyEmail/> */}
      {/* <VerifyCodeFalse/> */}
    </>
  )
}

export default App
