import { useSelfieSearch } from "../hooks/useSelfieSearch";
import PhotoCard from "../components/PhotoCard";
import { Upload, Search, Images } from "lucide-react";
import { useMemo, useEffect, useState, useRef } from "react";
import { PAGE_TITLE } from "../utils/styles";
function SelfieSearch() {
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const resultsRef = useRef(null);
  const {
    photo,
    setPhoto,
    loading,
    matches,
    search,
    searched,
    aiFilterApplied,
  } = useSelfieSearch();
  const previewUrl = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  const loadingRef = useRef(null);

  useEffect(() => {
    if (!loading) return;

    const steps = [
      { value: 10, text: "📤 Uploading your selfie..." },
      { value: 25, text: "😊 Detecting your face..." },
      { value: 45, text: "🧠 Generating face embedding..." },
      { value: 65, text: "🔍 Searching the gallery..." },
      { value: 85, text: "📸 Finding your best matches..." },
      { value: 95, text: "✨ Almost there..." },
    ];

    let index = 0;

    setProgress(steps[0].value);
    setStatus(steps[0].text);

    const timer = setInterval(() => {
      if (index < steps.length - 1) {
        index++;
        setProgress(steps[index].value);
        setStatus(steps[index].text);
      }
    }, 800);

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    if (progress > 0) {
      setProgress(100);
      setStatus("🎉 Your photos are ready!");

      const timer = setTimeout(() => {
        setProgress(0);
        setStatus("");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleSearch = async () => {
    ////-->search();
    search(description);
    requestAnimationFrame(() => {
      setTimeout(() => {
        loadingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className={`${PAGE_TITLE} mb-2`}>Search By Selfie</h1>

      <p className="text-gray-600 mb-8 text-center md:text-left">
        Upload your selfie and {import.meta.env.VITE_APPLICATION_TITLE} will
        find all matching photos.
      </p>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden mb-10">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-300 bg-gradient-to-r from-indigo-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-800">
            🤖 AI Face Search
          </h2>

          <p className="text-gray-600 mt-2">
            Upload one clear selfie and {import.meta.env.VITE_APPLICATION_TITLE}{" "}
            will instantly find every event photo containing you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
          {/* Upload */}
          <div className="flex flex-col items-center lg:items-start">
            <label
              htmlFor="selfie-upload"
              className={`
          inline-flex
          items-center
          gap-2
          px-6
          py-3
          rounded-xl
          font-semibold
          shadow
          transition
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
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
              className="hidden"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            {photo && (
              <div className="mt-2  px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                ✓ {photo.name}
              </div>
            )}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2">
              Describe the photos you're looking for (Optional)
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Examples:
              • near a tree
              • cutting the cake
              • standing on the stage
              • wearing sunglasses"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Preview */}

          <div className="flex justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                className="w-60 h-60 rounded-2xl object-cover  shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                No Preview
              </div>
            )}
          </div>

          {/* Search */}

          <div className="flex flex-col items-center lg:items-end ">
            <button
              disabled={!photo || loading}
              onClick={handleSearch}
              className="
          inline-flex
          items-center
          gap-2
          px-8
          py-2
          rounded-xl
          border-2
          border-indigo-600
          font-semibold
          text-indigo-600
          hover:bg-indigo-600
          hover:text-white
          transition
          disabled:opacity-40
        "
            >
              <Search size={18} />
              {loading ? "Searching..." : "Search Photos"}
            </button>

            <div className="mt-6 text-sm text-gray-500 text-center lg:text-right max-w-xs">
              🔒 Your selfie is used only for face matching and is never added
              to the gallery.
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t  border-gray-300 bg-gray-50 px-8 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>✅ Clear front-facing selfie</div>

            <div>🧠 AI-powered face recognition</div>

            <div>🔒 Privacy protected</div>
          </div>
        </div>
      </div>
      <div ref={loadingRef}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 rounded-full border-[10px] border-indigo-100"></div>

              <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-indigo-600 animate-spin"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-700">
                  {progress}%
                </span>
              </div>
            </div>

            <h2 className="mt-8 text-xl md:text-2xl font-bold text-center">
              {status}
            </h2>

            <p className="mt-2 text-gray-500 text-center px-6">
              {import.meta.env.VITE_APPLICATION_TITLE} is finding your best
              moments...
            </p>
          </div>
        ) : searched ? (
          <div className="mt-10">
            {description.trim() && !aiFilterApplied && (
              <div className="mb-4 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3">
                ⚠️ AI description filtering is currently unavailable. Showing
                all photos matching your selfie.
              </div>
            )}
            <div
              className="flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-4
    mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Matching Photos
              </h2>

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
        ) : null}
      </div>
    </div>
  );
}

export default SelfieSearch;
