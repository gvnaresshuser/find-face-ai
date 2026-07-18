import pool from "../config/db.js";
import { generateEmbedding } from "./aiService.js";
import { filterPhotosWithClaude } from "./claudeService.js";

import dotenv from "dotenv";
dotenv.config();
export const searchSelfieService = async (file, description = "") => {
  const aiResult = await generateEmbedding(file.buffer);

  if (!aiResult.success) {
    return {
      success: false,
      message: "No Face Found",
    };
  }

  const embedding = `[${aiResult.faces[0].embedding.join(",")}]`;
  console.log(process.env.SIMILARITY_THRESHOLD);
  ////-->const threshold = 0.5;
  //const threshold = Number(process.env.SIMILARITY_THRESHOLD);
  //const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD);
  const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD || "0.5");
  console.log(threshold, typeof threshold);
  const result = await pool.query(
    `
SELECT *
FROM (
    SELECT DISTINCT ON (p.id)
        p.id,
        p.image_url,
        f.face_index,
        f.confidence,
        f.embedding <=> $1 AS distance
    FROM face_embeddings f
    JOIN photos p
      ON p.id = f.photo_id
    WHERE f.embedding <=> $1 < $2
    ORDER BY p.id, distance ASC
) best_matches
ORDER BY distance ASC;
`,
    [embedding, threshold],
  );

   let matches = result.rows;
   let aiFilterApplied = false;

   // Optional AI filtering
   if (description?.trim()) {
     ////matches = await filterPhotosWithClaude(matches, description.trim());
       try {
         matches = await filterPhotosWithClaude(matches, description.trim());

         aiFilterApplied = true;
       } catch (error) {
         console.error("Claude filtering failed:", error.message);
       }
   }

  return {
    success: true,
    matches,
    aiFilterApplied,
    //matches: result.rows,
  };
};
