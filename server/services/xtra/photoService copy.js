import pool from "../config/db.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadPhotosService = async (files) => {
  const uploadedPhotos = [];

  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer);

    const photo = {
      publicId: result.public_id,
      imageUrl: result.secure_url,
      width: result.width,
      height: result.height,
    };

 await pool.query(
   `
  INSERT INTO photos
  (
      public_id,
      image_url,
      width,
      height
  )
  VALUES ($1,$2,$3,$4)
  `,
   [photo.publicId, photo.imageUrl, photo.width, photo.height],
 );

    uploadedPhotos.push(photo);
  }

  return uploadedPhotos;
};
