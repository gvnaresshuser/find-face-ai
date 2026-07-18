import { searchSelfieService } from "../services/searchService.js";

export const searchSelfie = async (req, res) => {
  try {
    const result = await searchSelfieService(req.file,req.body.description);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
