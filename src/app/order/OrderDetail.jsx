import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { getOrderById } from "../../data/OrderService";

const OrderDetail = () => {
  const [coupon, setCoupon] = useState("");
  const [order, setOrder] = useState({});
  const [orderDetail, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const orderData = await getOrderById(16);
      setOrder(orderData);
      const orderDetails = orderData.order_detail.map((o) => {
        o.product.url = `http://localhost:1313/api/v1/products/images/${o.product.url}`;
        return o;
      });
      setOrderDetails(orderDetails);
    };
    fetch();
  }, []);

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  return (
    <div className="order-page" style={{marginTop:'120px'}}>
      <h1>Order Page</h1>

      {/* Order Information Section */}
      <section>
        <h2>Order Information</h2>
        <div className="order-info">
          <p><strong>Full Name:</strong> {order.fullname}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone Number:</strong> {order.phone_number}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Note:</strong> {order.note}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Money:</strong> ${order.total_money}</p>
          <p><strong>Payment Method:</strong> {order.payment_method}</p>
          <p><strong>Shopping Date:</strong> {order.shopping_date}</p>
        </div>
      </section>

      {/* Ordered Products Section */}
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
              {orderDetail.map((row) => (
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
                      <span className="centered-text">{row.product.name}</span>
                      <img
                        src={row.product.url}
                        alt={row.product.name}
                        width={"100px"}
                        style={{ borderRadius: "30px" }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.numberOfProduct}</TableCell>
                  <TableCell align="right">
                    {row.price * row.numberOfProduct}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/* Coupon Section */}
      <section>
        <h2>Coupon</h2>
        <label>
          <span>Coupon Code:</span>
          <input type="text" value={coupon} onChange={handleCouponChange} />
        </label>
      </section>

      <button type="submit">Submit Order</button>
    </div>
  );
};

export default OrderDetail;
