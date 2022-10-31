import { useState, useEffect } from "react";

const HotelGallery = () => {
  // create a gallery of the hotel images dependent on what hotel you clicked
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelName, setHotelName] = useState([]);

  useEffect(() => {
    hotels();
  }, []);

  const hotels = async () => {
    const response = await fetch(URL);

    setHotelImages(await response.json());
  };
};

export default HotelGallery;
