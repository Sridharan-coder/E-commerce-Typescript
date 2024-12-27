
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Seller from './Seller/Seller';
import ProductSearch from './ProductSearch/ProductSearch';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import PaymentPage from './PaymentPage/PaymentPage';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Seller" element={<Seller />} />
        <Route path='/product/:p_type' element={<ProductSearch />} />
        <Route path='/item/:p_type' element={<Product />} />
        <Route path='/viewcart' element={<Cart />} />
        <Route path='/payment' element={<PaymentPage />} />
      </Routes>
    </>
  )

}

export default App;
