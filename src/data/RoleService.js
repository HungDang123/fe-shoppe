import axiosUtil from "./AxiosUtil";

export const getAllRoles = async () => {
  try {
    const response = await axiosUtil.get("roles");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get roles");
    }
  } catch (error) {
    console.error("Error in get all role: ", error);
    throw error;
  }
};
