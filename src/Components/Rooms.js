import React, { useState, useEffect } from "react";

const URL = "https://obmng.dbm.guestline.net/api/roomRates/OBMNG/OBMNG1";

const Rooms = () => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    rooms();
  }, []);

  const rooms = async () => {
    const response = await fetch(URL);

    setRoom(await response.json());
  };

  //   filter rooms button displayed by capacity
  const filterRooms = (e) => {
    const capacity = e.target.value;
    const filteredRooms = room.filter((room) => room.capacity == capacity);
    setRoom(filteredRooms);
  };

  return (
    <div>
      {/* filter dropdown by capacity of room */}
      <div className="selection-filter">
        <label for="filter">Filter by capacity: </label>
        <select onChange={filterRooms}>
          <option value="0">All</option>
          <option value="1">1 Person</option>
          <option value="2">2 People</option>
          <option value="3">3 People</option>
          <option value="4">4 People</option>
          <option value="5">5 People</option>
        </select>
      </div>
      {/* map through the rooms and display them */}
      {room.map((data) => {
        return (
          <div>
            <div className="list-group-item room-area" key={data.id}>
              <div className="room-name">{data.name}</div>
              <div className="room-description">{data.shortDescription}</div>
              <div className="room-capacity">Capacity: {data.occupancy}</div>
              <img
                className="room-image"
                src={data.images[0].url}
                alt={data.images[0].alt}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Rooms;
