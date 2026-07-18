import UploadZone from "../components/UploadZone";
import { PAGE_TITLE } from "../utils/styles";
function UploadPhotos() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className={`${PAGE_TITLE} mb-2`}>Upload Event Photos</h1>

      <p className="text-gray-600 mb-8">
        Upload event photos. AI will automatically detect faces and make them
        searchable.
      </p>

      <UploadZone />
    </div>
  );
}

export default UploadPhotos;
