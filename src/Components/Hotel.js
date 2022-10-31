import React, { useState, useEffect } from "react";
import "./Hotel.css";
import HotelImages from "./HotelImages";
import Rooms from "./Rooms";

const URL = "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

const Hotel = () => {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    hotels();
  }, []);

  const hotels = async () => {
    const response = await fetch(URL);

    setHotel(await response.json());
  };

  //   filter hotels button displayed by star rating
  const filterHotels = (e) => {
    const starRating = e.target.value;
    const filteredHotels = hotel.filter(
      (hotel) => hotel.starRating === starRating
    );
    setHotel(filteredHotels);
  };

  //   store filteredHotels in state
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    setFilteredHotels(hotel);
  }, [hotel]);

  return (
    <div>
      <div className="selection-filter">
        {/* drop down for useState */}
        <label for="filter">Filter by star rating: </label>
        <select onChange={filterHotels}>
          <option value="0">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Star</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
      </div>
      {hotel.map((data) => {
        return (
          <div>
            <div className="list-group-item hotel-area" key={data.id}>
              <div className="hotel-name">{data.name}</div>
              <img
                className="hotel-image"
                src={data.images[0].url}
                alt={data.images[0].alt}
              />
              <div className="hotel-address">{data.address1}</div>
              <div className="hotel-address">{data.address2}</div>
              <div className="star-rating fas fa-star">{data.starRating}</div>
              <div className="rooms">
                <Rooms rooms={data.rooms} />
              </div>
              <button
                click={<HotelImages images={data.images} />}
                type="button"
                className="btn btn-primary view-all-images"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                View Images
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hotel;
