import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from './Auth/firebase'; // Your Firestore config

const ChatRoomList = ({ onJoinRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'chatrooms'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChatRooms(rooms);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {chatRooms.map(room => (
          <li key={room.id} onClick={() => onJoinRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
