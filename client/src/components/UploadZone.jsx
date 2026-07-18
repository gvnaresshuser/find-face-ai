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

    /*   try {
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
    } */
    //----------------------------------------------------------------
    try {
      setUploading(true);

      await uploadPhotos(files, (percent) => {
        setProgress(percent);
      });

      setProgress(100);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setUploading(false);

      toast.success(
        "🎉 Photos uploaded successfully!\nYou can now view them in the Gallery.",
        {
          duration: 4000,
        },
      );

      setFiles([]);
      setProgress(0);
    } catch (error) {
      setUploading(false);
      toast.error("Upload Failed");
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

  // ===========================
  // Full Screen Loading Spinner
  // ===========================
  if (uploading) {
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
          Processing Event Photos...
        </h2>

        <p className="mt-2 text-gray-500 max-w-md">
          Uploading images, detecting faces, generating AI embeddings, and
          preparing them for instant search.
        </p>

        <div className="w-72 bg-gray-200 rounded-full h-2 mt-8 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm font-medium text-indigo-600">
          {progress}% Completed
        </p>
      </div>
    );
  }

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
              className="flex justify-between bg-white rounded-lg p-3 shadow mb-2"
            >
              <span>{file.name}</span>
              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          ))}

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
              transition-colors
              disabled:bg-gray-400
              disabled:cursor-not-allowed
            "
          >
            Upload Photos
          </button>
        </div>
      )}
    </>
  );
}

export default UploadZone;

/*
getRootProps and getInputProps are helper functions provided by react-dropzone. 
They return all the necessary props (event handlers, attributes, refs, etc.) 
that make drag-and-drop and file selection work correctly.
*/
