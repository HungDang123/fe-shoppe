import axiosUtil from "./AxiosUtil";

export const getCategories = async () => {
  try {
    const response = await axiosUtil.get("categories");
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get categories");
    }
  } catch (error) {
    console.error("Error in get categories: ", error);
    throw error;
  }
};
