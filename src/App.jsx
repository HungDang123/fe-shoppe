import { Route, Routes } from "react-router-dom";
import HomePage from "./app/home/HomePage";
import Header from "./app/header/header";
import Footer from "./app/footer/footer";
import { ProductDetail } from "./app/productDetail/ProductDetail";
import OrderPage from "./app/order/OrderPage";
import Login from "./app/login/login";
import Register from "./app/login/register";
import OrderDetail from "./app/order/OrderDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/order">
          <Route path="" element={<OrderPage />}></Route>
          <Route path="detail" element={<OrderDetail />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
