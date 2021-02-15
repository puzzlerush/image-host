import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from './ImageList';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('/images/all')
      setImages(response.data);
    };
    fetchImages();
  }, []);

  
  return (
    <div>
      <ImageList images={images}/>
    </div>
  );
};

export default HomePage;