function PhotoCard({ photo }) {
  console.log(photo);
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={photo.image_url}
        alt="Matched"
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold">Photo #{photo.id}</h3>

        {photo.status && (
          <p className="text-gray-400">Status: {photo.status}</p>
        )}

        {/* {photo.distance !== undefined && (
          <p className="text-green-600 font-semibold mt-2">
            Distance: {Number(photo.distance).toFixed(4)}
          </p>
        )} */}
        {photo.created_at !== undefined && (
          <p className="text-gray-400 mt-1">
            📅{" "}
            {new Date(photo.created_at).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;
