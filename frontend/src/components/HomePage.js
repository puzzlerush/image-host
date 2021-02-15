import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('/images/all')
      setImages(response.data);
    };
    fetchImages();
  }, []);

  const imagesToDisplay = images.map((image) => (
    <div key={image._id}>
      <p>{image.title}</p>
      <p>Posted on {image.createdAt} by {image.author.name}</p>
      <a href={`http://localhost:5000/images/${image._id}/file`}>View</a>
    </div>
  ))
  return (
    <div>
      {imagesToDisplay}
    </div>
  );
}

export default HomePage;