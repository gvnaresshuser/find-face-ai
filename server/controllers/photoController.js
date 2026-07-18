import pool from "../config/db.js";

export const getPhotos = async (req, res) => {
  const result = await pool.query("SELECT * FROM photos ORDER BY id DESC");
  console.log('LENGTH:'+result.rows.length);
  console.log(result.rows);
  res.json(result.rows);
};
