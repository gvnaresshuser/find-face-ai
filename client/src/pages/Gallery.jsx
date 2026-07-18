import {useState} from 'react';
import PhotoCard from "../components/PhotoCard";
import { useGallery } from "../hooks/useGallery";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { X, Images } from "lucide-react";
import { PAGE_TITLE } from "../utils/styles";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};
function Gallery() {
  const { photos, loading, refresh } = useGallery();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);

const handleRefresh = async () => {
  setRefreshLoading(true);

  try {
    await refresh();
  } finally {
    setRefreshLoading(false);
  }
};
  if (loading || refreshLoading) {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        h-[calc(100vh-8rem)]
        text-center
        px-6
      "
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
        </div>

        <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800">
          Loading Gallery...
        </h2>

        <p className="mt-2 text-gray-500 max-w-sm">
          Fetching your event photos. This will only take a moment.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className={`${PAGE_TITLE} mb-2`}>Gallery</h1>

        <span
          className="
    inline-flex
    items-center
    gap-3
    rounded-full
    bg-white
    px-4
    py-2
    border
    border-gray-200
    shadow-lg
  "
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <Images className="h-5 w-5 text-indigo-600" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-xs text-gray-500">Gallery</span>
            <span className="font-semibold text-gray-800">
              {photos.length === 0
                ? "No Photos Yet"
                : `${photos.length} Photo${photos.length > 1 ? "s" : ""}`}
            </span>
          </div>
        </span>
        <button
          onClick={handleRefresh}
          className="
    p-2.5
    rounded-full
    bg-white
    border
    shadow-sm
    hover:bg-blue-50
    transition
  "
        >
          <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-2xl bg-gray-50">
          <div className="text-6xl mb-4">📷</div>

          <h2 className="text-2xl font-bold text-gray-700">No Photos Yet</h2>

          <p className="mt-2 text-gray-500">
            Upload event photos to see them here.
          </p>
        </div>
      ) : (
        <motion.div
          className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-4
    gap-6
  "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.04,
                y: -6,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer"
            >
              <PhotoCard photo={photo} />
            </motion.div>
          ))}
        </motion.div>
      )}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="
    absolute
    -top-4
    -right-4
    w-12
    h-12
    rounded-full
    bg-white/90
    backdrop-blur
    shadow-xl
    flex
    items-center
    justify-center
    hover:bg-red-500
    hover:text-white
    hover:scale-110
    transition-all
    duration-300
  "
            >
              <X size={24} />
            </button>

            <img
              src={selectedPhoto.image_url}
              alt=""
              className="rounded-xl shadow-2xl max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
