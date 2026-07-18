import api from "./api";

////export const searchSelfie = async (photo) => {
  export const searchSelfie = async (photo, description = "") => {
    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("description", description);

    const response = await api.post("/search/selfie", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };
