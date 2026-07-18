import { useState } from "react";
import { searchSelfie } from "../services/searchApi";

export const useSelfieSearch = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);

  const search = async () => {
    if (!photo) return;

    try {
      setLoading(true);

      const result = await searchSelfie(photo);

      console.log(result);

      if (result.success) {
        setMatches(result.matches);
      } else {
        setMatches([]);
      }
    } catch (error) {
      console.error(error);
      alert("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    photo,
    setPhoto,
    loading,
    matches,
    search,
  };
};
