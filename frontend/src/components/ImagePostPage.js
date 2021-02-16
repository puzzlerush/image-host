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
    <>
      {imageInfo ? (
        <>
          <div className="post-title">{imageInfo.title}</div>
          <p>Posted by {imageInfo.author.name || 'Anonymous'} on {imageInfo.createdAt}</p>
          <img src={`/images/${id}/file`} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ImagePostPage;