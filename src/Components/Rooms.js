import React, { useState, useMemo, useEffect } from "react";

import "../App.css";

const Rooms = ({ hotelId }) => {
  const URL = `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`;
  const [rooms, setRooms] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [selectedCapacityAdults, setSelectedCapacityAdults] = useState(0);
  const [selectedCapacityChildren, setSelectedCapacityChildren] = useState(0);

  // filter rooms by capacity
  const handleCapacityChange = (e) => {
    const capacity = e.target.value;
    setSelectedCapacity(capacity);
  };

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setRooms(data?.rooms);
    };
    getRooms();
  }, [URL]);

  const filteredRooms = useMemo(
    () =>
      rooms?.filter((room) => {
        // updated check for select All option
        if (parseInt(selectedCapacity, 10) === 0) return room;
        return (
          parseInt(room?.occupancy?.maxOverall, 10) ===
          parseInt(selectedCapacity, 10)
        );
      }),
    [rooms, selectedCapacity]
  );

  return (
    <div className="room">
      {/* filter dropdown by capacity of room */}
      <div className="selection-filter-room">
        <label htmlFor="filter">Filter by capacity: </label>
        <select onChange={handleCapacityChange}>
          <option value="0">All</option>
          <option value="1">1 Person</option>
          <option value="2">2 People</option>
          <option value="3">3 People</option>
          <option value="4">4 People</option>
          <option value="5">5 People</option>
        </select>
      </div>
      <div className="rooms">
        {/* map through the rooms and display them */}
        {filteredRooms.map((data) => {
          return (
            <div
              style={{
                display: "flex",
                padding: "10px",
                height: "auto",
              }}
              key={crypto.randomUUID()}
            >
              <div className="list-group-item room-area" key={data?.id}>
                <div className="room-name">{data?.name}<div className="room-capacity">
                  Capacity: {data?.occupancy?.maxOverall}
                </div></div>
                <div className="room-description">{data?.shortDescription}</div>
                
                {/* <div>Adults: {data?.occupancy?.maxAdults}</div>
              <div>Children: {data?.occupancy?.maxChildren}</div> */}
                {/* display the image only if exists */}
                {data?.images[0]?.url && (
                  <img
                    className="room-image"
                    style={{
                      width: "200px",
                      padding: "10px",
                      height: "150px",
                      flexdirection: "row",
                    }}
                    src={data?.images[0]?.url || ""}
                    alt={data?.images[0]?.alt || ""}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
