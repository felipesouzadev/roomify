'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', capacity: 0 });

  useEffect(() => {
    axios.get('/api/rooms')
      .then((response) => setRooms(response.data));
  }, []);

  const handleAddRoom = async () => {
    const response = await axios.post('/api/rooms', newRoom);
    const addedRoom = await response.json();
    setRooms((prevRooms) => [...prevRooms, addedRoom]);
    setNewRoom({ name: '', capacity: '' });
  };

  return (
    <div>
      <h1>Rooms</h1>
      <input
        type="text"
        placeholder="Room Name"
        value={newRoom.name}
        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Capacity"
        value={newRoom.capacity}
        onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
      />
      <button onClick={handleAddRoom}>Add Room</button>

      <ul>
        {rooms.length > 0 && rooms.map((room) => (
          <li key={room.id}>
            {room.name} (Capacity: {room.capacity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
