import { useState, useEffect } from "react";

const HotelGallery = () => {
  //create a gallery of images based on the API from <Hotel />
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setImages(data);
  };

  const handleImageChange = (e) => {
    const image = e.target.value;
    setSelectedImage(image);
  };

  return (
    <div>
      <div className="selection-filter">
        <label htmlFor="filter">Filter by image: </label>
        <select onChange={handleImageChange}>
          <option value="0">All</option>

          {images.map((image) => {
            return <option value={image?.id}>{image?.name}</option>;
          })}
        </select>
      </div>
      {images.map((data, index) => {
        return (
          <div key={crypto.randomUUID()}>
            <div className="list-group-item hotel-area" key={data?.id}>
              <div className="hotel-name">{data?.name}</div>

              {data?.images[0]?.url && (
                <img
                  className="hotel-image"
                  src={data?.images[0]?.url || ""}
                  alt={data?.images[0]?.alt || ""}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelGallery;
