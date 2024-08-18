import axiosUtil from "./AxiosUtil";

export const registerUser = async (formData) => {
  try {
    const response = await axiosUtil.post(`users/register`, formData);
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        "Registration failed with status code: " + response.status
      );
    }
  } catch (error) {
    console.error("Error in register: ", error);
    throw error;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axiosUtil.post(`users/login`, userData);
    console.log("response: ", response);
    if (response.status) {
      return response.data;
    } else {
      throw new Error("Login failed with status code: " + response.status);
    }
  } catch (error) {
    console.error("Error in login: ", error);
    throw error;
  }
};
