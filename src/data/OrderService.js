import axiosUtil from "./AxiosUtil";

export const createOrder = async (formData) => {
  try {
    const response = await axiosUtil.post(`/orders`, formData);
    console.log(response);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Failed to get products");
    }
  } catch (error) {
    console.error("Error in get products: ", error);
    throw error;
  }
};
export const getOrderById = async (orderId) => {
  try {
    const response = await axiosUtil.get(`/orders/${orderId}`);
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
