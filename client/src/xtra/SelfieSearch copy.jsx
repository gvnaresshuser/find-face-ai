import { useSelfieSearch } from "../hooks/useSelfieSearch";
import PhotoCard from "../components/PhotoCard";

function SelfieSearch() {
  const { photo, setPhoto, loading, matches, search } = useSelfieSearch();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-3">Search By Selfie</h1>

      <p className="text-gray-600 mb-8">
        Upload your selfie and {import.meta.env.VITE_APPLICATION_TITLE} will
        find all matching photos.
      </p>

      <div className="bg-white rounded-xl shadow p-8">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button
          onClick={search}
          disabled={loading}
          className="
          mt-6
          bg-indigo-600
          text-white
          px-8
          py-3
          rounded-lg
          hover:bg-indigo-700
          disabled:bg-gray-400
          "
        >
          {loading ? "Searching..." : "Search Photos"}
        </button>
      </div>

      {matches.length > 0 && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Matching Photos</h2>

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
