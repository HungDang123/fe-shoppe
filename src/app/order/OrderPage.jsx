import React, { useContext, useEffect, useState } from "react";
import "./OrderPage.css";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { CartContext } from "../../context/cartContext";
import { createOrder } from "../../data/OrderService";
const OrderPage = () => {
  const { cart,clearCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    note: "",
    shipping_method: "express",
    payment_method: "cod",
    coupon: "",
  });
  const [coupon, setCoupon] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const newTotalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const newCartItems = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
    setCartItems(newCartItems);
    setTotalAmount(newTotalAmount);
  }, [cart]);

  const handleCustomerInfoChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevInfo) => {
      const newInfo = { ...prevInfo, [name]: value };
      return newInfo;
    });
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };
  const validateFrom = () => {
    const newErrors = {};
    if (!customerInfo.name) newErrors.name = "Name is required";
    if (!customerInfo.email) newErrors.email = "Email is required";
    if (!customerInfo.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(customerInfo.phone_number)) {
      newErrors.phone_number = "Phone number must be between 10 and 15 digits";
    }
    if (!customerInfo.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFrom()) {
      const formData = {
        user_id: 1,
        fullname: customerInfo.name,
        email: customerInfo.email,
        phone_number: customerInfo.phone_number,
        address: customerInfo.address,
        note: customerInfo.note,
        total_money: totalAmount,
        shipping_method: customerInfo.shipping_method,
        shipping_address: "TP HCM",
        payment_method: customerInfo.payment_method,
        cart_item: cartItems,
      };
      console.log(formData);
      try {
        const response = await createOrder(formData);
        if (response.status === 200) {
          alert("Order successfully");
          clearCart();
        } else {
          alert("Error creating");
        }
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    }
  };
  return (
    <div className="order-page">
      <h1>Order Page</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Customer Information</h2>
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
            />
          </label>
          {errors.name && <span className="error-message">{errors.name}</span>}
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
            />
          </label>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <label>
            <span>Phone Number:</span>
            <input
              type="tel"
              name="phone_number"
              value={customerInfo.phone_number}
              onChange={handleCustomerInfoChange}
            />
          </label>
          {errors.phone_number && (
            <span className="error-message">{errors.phone_number}</span>
          )}
          <label>
            <span>Address:</span>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange}
            />
          </label>
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
          <label>
            <span>Note:</span>
            <input
              type="text"
              name="note"
              value={customerInfo.note}
              onChange={handleCustomerInfoChange}
            />
          </label>
          <label>
            <span>Payment method:</span>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={customerInfo.payment_method}
              label="Payment method"
              name="payment_method"
              onChange={handleCustomerInfoChange}
            >
              <MenuItem value={"cod"}>Thanh toán khi nhận hàng</MenuItem>
              <MenuItem value={"qr"}>Chuyển khoản</MenuItem>
            </Select>
          </label>
          <label>
            <span>Shipping method:</span>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={customerInfo.shipping_method}
              label="Shipping method"
              name="shipping_method"
              onChange={handleCustomerInfoChange}
            >
              <MenuItem value={"express"}>Vận chuyển nhanh (Express)</MenuItem>
              <MenuItem value={"normal"}>Vận chuyển thường (Normal)</MenuItem>
            </Select>
          </label>
        </section>
        <section>
          <h2>Ordered Products</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Tổng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell-center"
                    >
                      <div className="table-cell-content">
                        <span className="centered-text">{row.name}</span>
                        {row.url ? (
                          <img
                            src={`http://localhost:1313/api/v1/products/images/${row?.url}`}
                            alt={row.name}
                            width={"100px"}
                            style={{ borderRadius: "30px" }}
                          />
                        ) : (
                          <img
                            src="https://media.istockphoto.com/id/687810238/vi/anh/ch%C3%B3-pug-v%E1%BB%9Bi-m%C5%A9-b%E1%BA%A3o-hi%E1%BB%83m-an-to%C3%A0n-x%C3%A2y-d%E1%BB%B1ng-m%C3%A0u-v%C3%A0ng-v%C3%A0-h%C3%ACnh-n%C3%B3n-v%C3%A0-404-l%E1%BB%97i-v%C3%A0-d%E1%BA%A5u-hi%E1%BB%87u-ng%C3%B5-c%E1%BB%A5t.jpg?b=1&s=612x612&w=0&k=20&c=OSoeVaWynLn1uMcvE9yxZFsFrpjdnSQ2OkYnhWUOBKU="
                            alt="Default image"
                            width={"100px"}
                            style={{ borderRadius: "30px" }}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {row.price * row.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <section>
          <h2>Coupon</h2>
          <label>
            <span>Coupon Code:</span>
            <input type="text" value={coupon} onChange={handleCouponChange} />
          </label>
          <span>Tổng tiền : {totalAmount}</span>
        </section>
        <button to={"./confirm"} type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
