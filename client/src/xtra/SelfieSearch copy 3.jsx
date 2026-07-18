import { useSelfieSearch } from "../hooks/useSelfieSearch";
import PhotoCard from "../components/PhotoCard";
import { Upload, Search, Images } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
function SelfieSearch() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const { photo, setPhoto, loading, matches, search } = useSelfieSearch();
  const previewUrl = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setStatus("");
      return;
    }

    const steps = [
      { value: 10, text: "Uploading your selfie..." },
      { value: 25, text: "Detecting faces..." },
      { value: 45, text: "Generating face embedding..." },
      { value: 65, text: "Searching the gallery..." },
      { value: 85, text: "Finding your best matches..." },
      { value: 95, text: "Almost there..." },
    ];

    let index = 0;

    setProgress(0);

    const timer = setInterval(() => {
      if (index < steps.length) {
        setProgress(steps[index].value);
        setStatus(steps[index].text);
        index++;
      }
    }, 700);

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (!loading && progress > 0) {
      setProgress(100);
      setStatus("Done!");

      const timer = setTimeout(() => {
        setProgress(0);
        setStatus("");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading]);

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
            className={`
    inline-flex
    items-center
    gap-2
    px-6
    py-3
    rounded-lg
    shadow-md
    transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed pointer-events-none"
        : "bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700"
    }
  `}
          >
            <Upload size={18} />
            Choose Selfie
          </label>

          <input
            id="selfie-upload"
            type="file"
            accept="image/*"
            disabled={loading}
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

      {/*  {loading && (
        <div className="mt-8 rounded-xl border bg-white p-6 shadow">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-indigo-700">{status}</span>

            <span className="font-bold">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )} */}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-[10px] border-indigo-100"></div>

            <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-indigo-600 animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-700">
                {progress}%
              </span>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold text-gray-800">{status}</h2>

          <p className="mt-2 text-gray-500">
            {import.meta.env.VITE_APPLICATION_TITLE} is finding your best
            moments...
          </p>
        </div>
      ) : (
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

      {/*  {matches.length > 0 && (
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
      )} */}
    </div>
  );
}

export default SelfieSearch;
