import api from "./api";
export const getPhotos = async () => {
  const response = await api.get("/photos");
  console.log(response.data);
  return response.data;
};
