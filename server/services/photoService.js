import pool from "../config/db.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { generateEmbedding } from "./aiService.js";

export const uploadPhotosService = async (files) => {
  const uploadedPhotos = [];

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("Uploading Cloudinary...");
    for (const file of files) {
      // ----------------------------
      // Upload to Cloudinary
      // ----------------------------
      const result = await uploadToCloudinary(file.buffer);

      const photo = {
        publicId: result.public_id,
        imageUrl: result.secure_url,
        width: result.width,
        height: result.height,
      };

      // ----------------------------
      // Save Photo
      // ----------------------------
      const photoResult = await client.query(
        `
        INSERT INTO photos
        (
            public_id,
            image_url,
            width,
            height
        )
        VALUES
        (
            $1,$2,$3,$4
        )
        RETURNING id
        `,
        [photo.publicId, photo.imageUrl, photo.width, photo.height],
      );

      photo.id = photoResult.rows[0].id;

      // ----------------------------
      // Generate Face Embeddings
      // ----------------------------
      const aiResult = await generateEmbedding(file.buffer);
      console.log("Faces detected:", aiResult.facesDetected);

      console.log(
        `Photo ${photo.id}: ${aiResult.facesDetected} face(s) detected`,
      );

      // ----------------------------
      // Save Every Face
      // ----------------------------
      if (aiResult.success && aiResult.facesDetected > 0) {
        for (const face of aiResult.faces) {
           console.log("Inserting Face:", face.faceIndex);

          const embeddingVector = `[${face.embedding.join(",")}]`;

          await client.query(
            `
            INSERT INTO face_embeddings
            (
                photo_id,
                face_index,
                embedding,
                bbox_x,
                bbox_y,
                bbox_width,
                bbox_height,
                confidence
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            `,
            [
              photo.id,
              face.faceIndex,
              embeddingVector,
              face.bbox.x,
              face.bbox.y,
              face.bbox.width,
              face.bbox.height,
              face.confidence,
            ],
          );
           console.log("Inserted Face:", face.faceIndex);
        }
      }

      uploadedPhotos.push({
        ...photo,
        facesDetected: aiResult.facesDetected,
      });
    }

    console.log("Committing Transaction...");
    await client.query("COMMIT");
    console.log("Transaction Committed");

    console.log(uploadedPhotos);
    console.log("Returning Response");
    return uploadedPhotos;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Upload Transaction Failed:", error);
    throw error;
  } finally {    
    client.release();
  }
};
