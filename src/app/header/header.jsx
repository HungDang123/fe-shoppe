// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [clicked, setClicked] = useState(false);

  const location = useLocation();

  // Handle link click to hide the menu
  const handleLinkClick = () => {
    setClicked(false);
  };

  // Hide menu when route changes
  useEffect(() => {
    setClicked(false);
  }, [location]);

  return (
    <>
      <nav className={`NavbarItems ${clicked ? "active" : ""}`}>
        <h1 className="nav-logo">
          <Link to="/">
            <img
              src="https://media.istockphoto.com/id/687810238/vi/anh/ch%C3%B3-pug-v%E1%BB%9Bi-m%C5%A9-b%E1%BA%A3o-hi%E1%BB%83m-an-to%C3%A0n-x%C3%A2y-d%E1%BB%B1ng-m%C3%A0u-v%C3%A0ng-v%C3%A0-h%C3%ACnh-n%C3%B3n-v%C3%A0-404-l%E1%BB%97i-v%C3%A0-d%E1%BA%A5u-hi%E1%BB%87u-ng%C3%B5-c%E1%BB%A5t.jpg?b=1&s=612x612&w=0&k=20&c=OSoeVaWynLn1uMcvE9yxZFsFrpjdnSQ2OkYnhWUOBKU="
              alt=""
              width="250px"
              className="mt-2"
            />
          </Link>
        </h1>

        <div className="menu-icon" onClick={() => setClicked(!clicked)}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={`nav-menu ${clicked ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className="nav-links"
              onClick={handleLinkClick}
            >
             Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/order" className="nav-links" onClick={handleLinkClick}>
             Giỏ hàng
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={handleLinkClick}
            >
              Đăng nhập
            </Link>
          </li>
          <Link to="/login" onClick={handleLinkClick}>
            <button>Đăng nhập</button>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Header;
