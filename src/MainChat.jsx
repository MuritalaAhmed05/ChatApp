import React, { useState } from 'react';
import CreateRoom from './createroom'; // Import CreateRoom component
// import ChatRooms from './ChatRooms'; // Import ChatRooms component
import Chat from './Chat'; // Import Chat component
import ChatRoomList from './listroom';
const MainChat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); // State to keep track of the selected room

  const handleJoinRoom = (roomId) => {
    setSelectedRoom(roomId); // Update the selected room when a room is clicked
  };

  return (
    <div>
      <h1>Main Chat</h1>
      <CreateRoom />
      <ChatRoomList onJoinRoom={handleJoinRoom} />

      {/* Render Chat component for the selected room */}
      {selectedRoom && <Chat roomId={selectedRoom} />}
    </div>
  );
};

export default MainChat;
