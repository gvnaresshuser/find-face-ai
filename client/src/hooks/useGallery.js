import { useEffect, useState } from "react";
import { getPhotos } from "../services/photoApi";
export const useGallery = () => {
    const [photos,setPhotos] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        loadPhotos();
    },[]);

    async function loadPhotos(){
        try{
            const data = await getPhotos();
            setPhotos(data);
        }
        finally{
            setLoading(false);
        }
    }
    return{
        photos,
        loading,
        refresh:loadPhotos
    };
};