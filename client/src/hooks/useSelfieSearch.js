import { useState, useEffect } from "react";
import { searchSelfie } from "../services/searchApi";

export const useSelfieSearch = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [searched, setSearched] = useState(false);
  const [aiFilterApplied, setAiFilterApplied] = useState(true);

  useEffect(() => {
    if (photo) {
      setMatches([]);
      setSearched(false);
    }
  }, [photo]);

  //const search = async () => {
  const search = async (description = "") => {
    if (!photo) return;

    try {
      setSearched(true);
      setLoading(true);
      setMatches([]); // Clear previous gallery immediately

      ////-->const result = await searchSelfie(photo);
      const result = await searchSelfie(photo, description);

      console.log(result);

     /*  if (result.success) {
        setMatches(result.matches);
      } else {
        setMatches([]);
      } */
      if (result.success) {
        setMatches(result.matches);

        // true if Claude filtered successfully
        // false if fallback to face search
        setAiFilterApplied(result.aiFilterApplied);
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
    searched,
    aiFilterApplied,
  };
};
