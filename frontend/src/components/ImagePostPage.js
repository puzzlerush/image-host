import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImagePostPage = () => {
  const { id } = useParams();
  const [imageInfo, setImageInfo] = useState(null);
  
  const fetchImage = async () => {
    const response = await axios.get(`/images/${id}`);
    setImageInfo(response.data)
  };
  
  useEffect(() => {
    fetchImage();
  }, [])
  return (
    <div className="content-wrapper">
      {imageInfo ? (
        <>
          <div className="post-title">{imageInfo.title}</div>
          <p>Posted by {imageInfo.author ? imageInfo.author.name : 'Anonymous'} on {imageInfo.createdAt}</p>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${id}/file`} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ImagePostPage;