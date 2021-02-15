import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImagePostPage = () => {
  const { id } = useParams();
  const [imageInfo, setImageInfo] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(`/images/${id}`);
      setImageInfo(response.data)
    };
    fetchImage();
  }, [])
  return (
    <div className="content-wrapper">
      {imageInfo ? (
        <>
          <div className="post-title">{imageInfo.title}</div>
          <p>Posted by {imageInfo.author.name || 'Anonymous'} on {imageInfo.createdAt}</p>
          <img src={`/images/${id}/file`} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ImagePostPage;