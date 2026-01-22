import api from "./api";

export const loginUser = async (data) => {
  const response = await api.post("user/login", data);
  return response.data;
};
