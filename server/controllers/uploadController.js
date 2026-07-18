//TEST IN POSTMAN WITH FILES - WORKING
/* export const uploadPhotos = async (req, res) => {
  console.log(req.files.length);

  res.json({
    success: true,
    files: req.files.length,
  });
}; */

//UPLOAD TO CLOUDINARY
/* import { uploadPhotosService } from "../services/photoService.js";

export const uploadPhotos = async (req, res) => {
  const uploadedPhotos = await uploadPhotosService(req.files);

  res.json({
    success: true,
    uploadedPhotos,
  });
}; */
//--------------------------------
import { uploadPhotosService } from "../services/photoService.js";

export const uploadPhotos = async (req, res) => {
  try {
    console.time("Upload Pipeline");
    const uploadedPhotos = await uploadPhotosService(req.files);
console.timeEnd("Upload Pipeline");
   /*  res.json({
      success: true,
      uploadedPhotos,
    }); */
    return res.json({
      success: true,
      message: "Upload Completed",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

