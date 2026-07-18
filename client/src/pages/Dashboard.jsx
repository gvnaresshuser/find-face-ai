import { Images, Search, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
   const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="max-w-4xl text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 mb-6">
          <Sparkles className="w-12 h-12 text-indigo-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to{" "}
          <span className="text-indigo-600">
            {import.meta.env.VITE_APPLICATION_TITLE}
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Instantly organize and search event photos using advanced AI face
          recognition. Upload event photos once, then let every guest find their
          own memories by simply uploading a selfie.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div
            onClick={() => navigate("/upload")}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <Upload className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

            <h2 className="text-xl font-semibold mb-2">Upload Event Photos</h2>

            <p className="text-gray-600">
              Upload hundreds of event photos and let AI automatically detect
              every face.
            </p>
          </div>

          <div
            onClick={() => navigate("/selfie-search")}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <Search className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

            <h2 className="text-xl font-semibold mb-2">Search by Selfie</h2>

            <p className="text-gray-600">
              Guests simply upload a selfie to instantly discover every photo
              they appear in.
            </p>
          </div>

          <div
            onClick={() => navigate("/gallery")}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <Images className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

            <h2 className="text-xl font-semibold mb-2">Smart Gallery</h2>

            <p className="text-gray-600">
              Browse all uploaded event photos with a beautiful, responsive
              gallery experience.
            </p>
          </div>
        </div>

        <div className="mt-14 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-6 py-3 text-indigo-700 font-semibold">
          📸 Powered by AI • Face Recognition • PostgreSQL + pgvector •
          Cloudinary
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
