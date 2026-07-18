import pool from "../config/db.js";
import { generateEmbedding } from "./aiService.js";

export const searchSelfieService = async (file) => {
  const aiResult = await generateEmbedding(file.buffer);

  if (!aiResult.success) {
    return {
      success: false,
      message: "No Face Found",
    };
  }

  const embedding = `[${aiResult.faces[0].embedding.join(",")}]`;

  const result = await pool.query(
    `
SELECT

p.id,

p.image_url,

f.face_index,

f.confidence,

f.embedding <=> $1 AS distance

FROM face_embeddings f

JOIN photos p

ON p.id=f.photo_id

ORDER BY distance

LIMIT 20
`,
    [embedding],
  );

  return {
    success: true,

    matches: result.rows,
  };
};
