import pool from "../config/db.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { generateEmbedding } from "./aiService.js";

export const uploadPhotosService = async (files) => {
  const uploadedPhotos = [];

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer);

      const photo = {
        publicId: result.public_id,
        imageUrl: result.secure_url,
        width: result.width,
        height: result.height,
      };

      const photoResult = await client.query(
        `
        INSERT INTO photos
        (
          public_id,
          image_url,
          width,
          height
        )
        VALUES ($1,$2,$3,$4)
        RETURNING id
        `,
        [photo.publicId, photo.imageUrl, photo.width, photo.height],
      );

      photo.id = photoResult.rows[0].id;

      const aiResult = await generateEmbedding(file.buffer);

      uploadedPhotos.push(photo);
    }

    await client.query("COMMIT");

    return uploadedPhotos;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
