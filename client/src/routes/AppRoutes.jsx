import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import UploadPhotos from "../pages/UploadPhotos";
import Gallery from "../pages/Gallery";
import SelfieSearch from "../pages/SelfieSearch";
import SearchResults from "../pages/SearchResults";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/upload" element={<UploadPhotos />} />

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/selfie-search" element={<SelfieSearch />} />

      <Route path="/results" element={<SearchResults />} />
    </Routes>
  );
}

export default AppRoutes;
