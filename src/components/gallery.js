import { useState, useEffect } from 'react';

export default function Gallery(){
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setPhotos(data.slice(0, 30)); // first 30 photos for demonstration
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="gallery-container">
      {photos.map(photo => (
        <div key={photo.id} className="photo-item">
          <img src={photo.url} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
      <style jsx>{`
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .photo-item {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};