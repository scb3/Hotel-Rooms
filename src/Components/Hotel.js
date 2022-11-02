import React, { useState, useEffect, useMemo } from "react";

import Rooms from "./Rooms";
import "../App.css";

const URL = "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [starRating, setStarRating] = useState("");
  const [, setImages] = useState();

  const getHotels = React.useCallback(async () => {
    const response = await fetch(URL);
    setHotels(await response.json());
    console.log(hotels);
  }, []);

  useEffect(() => {
    getHotels();
  }, [getHotels]);

  const filteredHotels = React.useMemo(
    () =>
      +starRating ? hotels.filter((h) => h.starRating === starRating) : hotels,
    [hotels, starRating]
  );

  return (
    <div className="body">
      <div
        className="selection-filter"
        onChange={(e) => setStarRating(e.target.value || "")}
      >
        {/* drop down for useState */}
        <label htmlFor="filter">Filter by star rating: </label>
        <select id="filter">
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
              {/* button to open HotelModal.js */}

              <div className="hotel-address">{data?.address1}</div>
              <div className="hotel-address">{data?.address2}</div>
              <div className="hotel-address">{data?.postcode}</div>
              <div className="hotel-address">{data.town}</div>

              <div className="star-rating fas fa-star">{data?.starRating}</div>
              <button
                onClick={() =>
                  setImages((data.images || []).map((i) => i.url || ""))
                }
                type="button"
                className="btn btn-primary view-all-images"
                // onClick={openImages}
              >
                View Gallery
              </button>
              <div>
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
