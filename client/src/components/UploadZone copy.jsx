import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { uploadPhotos } from "../services/uploadApi";
import toast from "react-hot-toast";

function UploadZone() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select photos");
      return;
    }

    try {
      setUploading(true);

      const result = await uploadPhotos(files, (percent) => {
        setProgress(percent);
      });

      console.log(result);

      toast.success("Upload Successful");

      setFiles([]);

      setProgress(0);
    } catch (error) {
      console.error(error);

      toast.error("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,

    accept: {
      "image/*": [],
    },

    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="
        border-2
        border-dashed
        border-indigo-500
        rounded-xl
        bg-white
        p-16
        text-center
        cursor-pointer
        hover:bg-indigo-50
        transition
      "
      >
        <input {...getInputProps()} />

        <div className="text-6xl">📷</div>

        <h2 className="text-2xl font-semibold mt-4">Drag & Drop Photos Here</h2>

        <p className="mt-3 text-gray-500">or Click to Browse</p>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Selected Photos</h3>

          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between bg-white rounded p-3 shadow mb-2"
            >
              <span>{file.name}</span>

              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          ))}
          {uploading && (
            <div className="mt-6">
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-2">Upload Progress : {progress}%</p>
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="
              mt-6
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-3
              rounded-lg
              disabled:bg-gray-400
            "
          >
            {uploading ? "Uploading..." : "Upload Photos"}
          </button>
        </div>
      )}
    </>
  );
}

export default UploadZone;
