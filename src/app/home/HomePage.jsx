/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import { Box } from "@mui/material";
import { ProductItem } from "./ProductItem";
import { Loading } from "../loading/Loading";
import TextSearch from "../components/TextSearch";
import Combobox from "../components/Combobox";
import { getProducts } from "../../data/ProductService";
import PaginationCpn from "../components/Pagination";
import { getCategories } from "../../data/CategoryService";
const valueDefault = {
  value: "0",
  label: "Tất cả",
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagePresent, setPagePresent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    keyword: "",
    category_id: valueDefault.value,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setLoading(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProducts(
          pagePresent,
          3,
          formValues.keyword,
          formValues.category_id
        );
        setProducts(productData.list);
        setTotalPages(productData.totalPages);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    };
    fetchProduct();
  }, [pagePresent, formValues]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoriesData = await getCategories();
        const transformedCategories = categoriesData.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    };
    fetchCategory();
  }, []);

  const handlePageChange = (page) => {
    setPagePresent(page - 1);
    console.log("Page changed to : " + page);
  };
  const handleInputChange = (e)=>{
    const {name,value} = e.target
    setFormValues({
      ...formValues,
      [name]:value,
    })
    console.log(formValues.keyword);
    
  }
  const handleChange = (value) => {
    setFormValues({
      ...formValues,
      category_id: value,
    });
    console.log(value);
  };
  return (
    <>
      {loading ? (
        <div style={{ marginTop: "110px" }}>
          <div className="d-flex">
            <div className="me-2" style={{ flex: "1 1 auto" }}>
              <TextSearch handleInputChange={handleInputChange}/>
            </div>
            <div className="ms-2" style={{ flex: "1 1 auto" }}>
              <Combobox
                item={categories}
                handleChange={handleChange}
                valueDefault={valueDefault}
              />
            </div>
          </div>
          <Box className={styles.root}>
            <div className={`${styles.hotelpaper} row`}>
              <Box className={`${styles.root3} col-lg-4 col-md-6`}>
                {products.map((pro) => (
                  <ProductItem key={pro.id} product={pro} />
                ))}
              </Box>
            </div>
          </Box>
          <PaginationCpn
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomePage;
