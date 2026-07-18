import api from "./api";

export const uploadPhotos = async (files, onProgress) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("photos", file);
  });

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      onProgress(percent);
    },
  });

  return response.data;
};
