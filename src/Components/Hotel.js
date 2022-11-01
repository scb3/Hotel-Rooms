import React, { useState, useEffect, useMemo } from "react";

import Rooms from "./Rooms";
import "../App.css";

const URL = "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setHotels(data);
  };

  // filter hotels button displayed by star rating
  const handleRatingChange = (e) => {
    const starRating = e.target.value;
    setSelectedRating(starRating);
  };

  const filteredHotels = useMemo(
    () =>
      hotels.filter((hotel) => {
        // updated chck for select All option
        if (parseInt(selectedRating, 10) === 0) return hotel;
        return parseInt(hotel.starRating, 10) === parseInt(selectedRating, 10);
      }),
    [hotels, selectedRating]
  );

  return (
    <div>
      <div className="selection-filter">
        {/* drop down for useState */}
        <label htmlFor="filter">Filter by star rating: </label>
        <select onChange={handleRatingChange}>
          <option value="0">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Star</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
      </div>
      {filteredHotels.map((data, index) => {
        return (
          <div key={crypto.randomUUID()}>
            <div className="list-group-item hotel-area" key={data?.id}>
              <div className="hotel-name">{data?.name}</div>

              {/* display the image only if exists */}
              {data?.images[0]?.url && (
                <img
                  className="hotel-image"
                  src={data?.images[0]?.url || ""}
                  alt={data?.images[0]?.alt || ""}
                />
              )}

              <div className="hotel-address">{data?.address1}</div>
              <div className="star-rating fas fa-star">{data?.starRating}</div>
              <div className="rooms">
                <Rooms hotelId={data?.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hotel;
