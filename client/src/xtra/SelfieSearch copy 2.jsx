import { useSelfieSearch } from "../hooks/useSelfieSearch";
import PhotoCard from "../components/PhotoCard";
import { Upload, Search, Images } from "lucide-react";
import { useMemo } from "react";
function SelfieSearch() {
  const { photo, setPhoto, loading, matches, search } = useSelfieSearch();
  const previewUrl = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-3">Search By Selfie</h1>

      <p className="text-gray-600 mb-8">
        Upload your selfie and {import.meta.env.VITE_APPLICATION_TITLE} will
        find all matching photos.
      </p>

      <div className="flex items-center gap-5">
        <div>
          <label
            htmlFor="selfie-upload"
            className="
        inline-flex
        items-center
        gap-2
        px-6
        py-3
        bg-indigo-600
        text-white
        rounded-lg
        cursor-pointer
        hover:bg-indigo-700
        transition
        shadow-md
      "
          >
            📷 Choose Selfie
          </label>

          <input
            id="selfie-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          {photo && (
            <p
              className="
              mt-2
      items-center
      px-3
      py-1
      rounded-full
      bg-green-100
      text-green-700
      text-sm
      font-medium
    "
            >
              ✓ {photo.name}
            </p>
          )}
        </div>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Selfie Preview"
            className="
        w-24
        h-24
        rounded-xl
        object-cover
        border-2
        border-indigo-200
        shadow-lg
      "
          />
        )}
        {previewUrl && (
          <button
            onClick={search}
            disabled={loading}
            className="
      self-center
      inline-flex
      items-center
      gap-2
      px-8
      py-3
      border-2
      border-indigo-600
      text-indigo-600
      font-semibold
      rounded-lg
      transition-all
      duration-300
      hover:bg-indigo-600
      hover:text-white
      hover:shadow-lg
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
          >
            <Search size={18} />
            {loading ? "Searching..." : "Search Photos"}
          </button>
        )}
      </div>

      {matches.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Matching Photos</h2>

            <span
              className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      bg-green-100
      text-green-700
      font-semibold
      shadow-sm
    "
            >
              <Images size={18} />
              {matches.length} Photo{matches.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-6
              "
          >
            {matches.map((photo) => (
              <PhotoCard
                key={`${photo.id}-${photo.face_index}`}
                photo={photo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelfieSearch;
