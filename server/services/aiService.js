import axios from "axios";
import FormData from "form-data";

export const generateEmbedding = async (fileBuffer) => {
  try {
    const form = new FormData();

    form.append("photo", fileBuffer, {
      filename: "photo.jpg",
      contentType: "image/jpeg",
    });

    const response = await axios.post(
      "http://localhost:8000/generateEmbedding",
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw error;
  }
};