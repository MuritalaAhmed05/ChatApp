import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp
import { firestore } from './Auth/firebase'; // Your firebase config
import { Link } from 'react-router-dom';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (roomName.trim() === '') {
      alert('Room name is required');
      return;
    }

    try {
      // Create a new room document
      const roomDoc = await addDoc(collection(firestore, 'chatRooms'), {
        name: roomName,
        createdAt: new Date(),
      });

      // Optionally initialize messages for the new room
      await addDoc(collection(firestore, 'messages'), {
        roomId: roomDoc.id, // Use the new room's ID
        message: 'Room created!',
        createdAt: serverTimestamp(), // Use server timestamp
      });

      setRoomName(''); // Clear the input after creating
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  return (
    <form onSubmit={handleCreateRoom}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
        required
      />
      <button type="submit">Create Room</button>
      <Link to="/ChatRoomList">See Room</Link>
    </form>
  );
};

export default CreateRoom;
