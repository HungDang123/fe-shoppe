import axiosUtil from "./AxiosUtil";

export const getProducts = async (page, limit, keyword, category_id) => {
  try {
    const response = await axiosUtil.get(
      `products?page=${page}&limit=${limit}&keyword=${keyword}&category_id=${category_id}`
    );
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get products");
    }
  } catch (error) {
    console.error("Error in get products: ", error);
    throw error;
  }
};
export const getDetailProduct = async (productId) => {
  try {
    const response = await axiosUtil.get(`/products/${productId}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get products");
    }
  } catch (error) {
    console.error("Error in get products: ", error);
    throw error;
  }
};
export const getProductByIds = async (ids)=>{
  try {
    const response = await axiosUtil.get(`/products/by-ids?ids=${ids}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get products");
    }
  } catch (error) {
    console.error("Error in get products: ", error);
    throw error;
  }
}