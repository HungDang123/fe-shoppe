import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useEffect, useState } from "react";
import { Button, Skeleton, Stack } from "@mui/material";

export function ProductItem({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={210} height={120} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton
          variant="rounded"
          width={80}
          height={60}
          style={{ float: "right" }}
        />
      </Stack>
    );
  }

  return (
    <div className={styles.card} style={{ marginBottom: "10px" }}>
      <Link to={`./product/${product.id}`}>
        <div className={styles.cardImage}>
          {product.url ? (
            <img
              src={`http://localhost:1313/api/v1/products/images/${product.url}`}
              alt={product.name}
            />
          ) : (
            <img
              src="https://media.istockphoto.com/id/687810238/vi/anh/ch%C3%B3-pug-v%E1%BB%9Bi-m%C5%A9-b%E1%BA%A3o-hi%E1%BB%83m-an-to%C3%A0n-x%C3%A2y-d%E1%BB%B1ng-m%C3%A0u-v%C3%A0ng-v%C3%A0-h%C3%ACnh-n%C3%B3n-v%C3%A0-404-l%E1%BB%97i-v%C3%A0-d%E1%BA%A5u-hi%E1%BB%87u-ng%C3%B5-c%E1%BB%A5t.jpg?b=1&s=612x612&w=0&k=20&c=OSoeVaWynLn1uMcvE9yxZFsFrpjdnSQ2OkYnhWUOBKU="
              alt="Default image"
            />
          )}
        </div>
        <p className={styles.cardTitle}>{product.name}</p>
      </Link>
      <p className={styles.cardBody}>
        <StarRateIcon className="text-warning" />
        <strong>5.0 </strong> <span>100 đánh giá</span>
      </p>
      <div>
        <Button className="btn btn-primary">Lưu</Button>
        <Button className="btn btn-success">Mua</Button>
      </div>
      <p className={styles.footer}>
        <strike>{product.price} VND</strike>{" "}
        <span className={styles.byName} style={{ color: "#B22222" }}>
          {product.price} VND
        </span>
      </p>
    </div>
  );
}
