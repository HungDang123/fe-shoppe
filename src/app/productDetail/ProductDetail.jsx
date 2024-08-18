import React, { useContext, useEffect, useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import styles from "./ProductDetail.module.css";
import { Feedback } from "./Feedback";
import { getDetailProduct } from "../../data/ProductService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CartContext } from "../../context/cartContext";
import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const showImage = (src) => {
    const fullscreenImage = document.getElementById("fullscreen-image");
    const fullscreenImageSrc = document.getElementById("fullscreen-image-src");

    fullscreenImageSrc.src = `http://localhost:1313/api/v1/products/images/${src}`;
    fullscreenImage.classList.add(styles.show);
  };
  const prevImage = () => {
    if (images) {
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
      showImage(images[currentImageIndex].imageUrl);
    }
  };
  const nextImage = () => {
    if (images) {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else {
        setCurrentImageIndex(images.length - 1);
      }
      showImage(images[currentImageIndex].imageUrl);
    }
  };
  const closeFullscreenImage = () => {
    const fullscreenImage = document.getElementById("fullscreen-image");
    fullscreenImage.classList.remove(styles.show);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDetailProduct(productId);
      setProduct(response);
      setImages(product.productImages);
    };
    fetchData();
  }, []);
  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    // Đảm bảo số lượng không giảm xuống dưới 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCartHandler = () => {
    console.log(cart);
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      updateQuantity(itemInCart, itemInCart.quantity + quantity);
    } else {
      addToCart(product, quantity);
    }
    console.log(cart);
  };
  return (
    <main className={styles.detail} style={{ marginTop: "120px" }}>
      <div className="container">
        <div className={styles.detailContent}>
          <div className={styles.detailImg}>
            <div className={styles.detailImgContent}>
              <div className={styles.detailImga}>
                {product.url ? (
                  <LazyLoadImage
                    src={`http://localhost:1313/api/v1/products/images/${product.url}`}
                    alt={product.name}
                    effect="blur"
                  />
                ) : (
                  <LazyLoadImage
                    src="https://media.istockphoto.com/id/687810238/vi/anh/ch%C3%B3-pug-v%E1%BB%9Bi-m%C5%A9-b%E1%BA%A3o-hi%E1%BB%83m-an-to%C3%A0n-x%C3%A2y-d%E1%BB%B1ng-m%C3%A0u-v%C3%A0ng-v%C3%A0-h%C3%ACnh-n%C3%B3n-v%C3%A0-404-l%E1%BB%97i-v%C3%A0-d%E1%BA%A5u-hi%E1%BB%87u-ng%C3%B5-c%E1%BB%A5t.jpg?b=1&s=612x612&w=0&k=20&c=OSoeVaWynLn1uMcvE9yxZFsFrpjdnSQ2OkYnhWUOBKU="
                    alt="Default image"
                    effect="blur"
                  />
                )}
              </div>
              <br />
              <ul className={styles.detailImgList}>
                {product?.productImages &&
                  Array.isArray(product.productImages) &&
                  product.productImages.map((img) => (
                    <li key={img.id}>
                      <LazyLoadImage
                        src={`http://localhost:1313/api/v1/products/images/${img.imageUrl}`}
                        alt={img.id}
                        onClick={() => showImage(`${img.imageUrl}`)}
                      />
                    </li>
                  ))}
              </ul>
              <div id="fullscreen-image" className={styles.fullscreenImage}>
                <img
                  id="fullscreen-image-src"
                  className={styles.fullscreenImageSrc}
                  src=""
                  alt=""
                />
                <span
                  className={styles.closeButton}
                  onClick={closeFullscreenImage}
                >
                  ×
                </span>
                <div className={styles.navigationButtons}>
                  <button
                    className={styles.navigationButton}
                    id="prev-button"
                    onClick={prevImage}
                  >
                    &lt;
                  </button>
                  <button
                    className={styles.navigationButton}
                    id="next-button"
                    onClick={nextImage}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.detailText}>
            <h2>{product.name}</h2>
            <div className={styles.detailVote}>
              <StarRateIcon className="text-warning" />
              <span>5.0</span>
              <span>(50 đánh giá)</span>
            </div>
            <div className={styles.detailPrice}>
              <span>{product.price} đ</span>
              <span>{product.price} đ</span>
              <span className={styles.priceSale}>-20%</span>
              <div className={styles.quantityControl}>
                <button className={styles.button} onClick={decrement}>
                  -
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button className={styles.button} onClick={increment}>
                  +
                </button>
              </div>
            </div>

            <ul className={styles.detailBtn}>
              <li>
                <button onClick={() => addToCartHandler(product)}>
                  <i className="fa-solid fa-cart-shopping" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </li>
              <li>
                <button>Đặt ngay</button>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className={styles.feedback}>
          <Feedback />
        </div>
      </div>
    </main>
  );
}
