import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGrid from './ImageGrid';

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('/images/all')
      setImages(response.data);
      setLoading(false);
    };
    fetchImages();
  }, []);

  
  return (
    <div>
      <ImageGrid images={images} loading={loading}/>
    </div>
  );
};

export default HomePage;