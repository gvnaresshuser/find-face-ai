function PhotoCard({photo}){

    return(

        <div
            className="
            bg-white
            rounded-xl
            shadow
            overflow-hidden
            "
        >

            <img
                src={photo.image_url}
                className="
                w-full
                h-52
                object-cover
                "
            />

            <div className="p-4">

                <h3 className="font-bold">

                    Photo #{photo.id}

                </h3>

                <p>

                    Status :

                    {photo.status}

                </p>

            </div>

        </div>

    );

}

export default PhotoCard;