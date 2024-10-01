import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from './Auth/firebase'; // Your firebase config
import { auth } from './Auth/firebase'; // Firebase authentication
import { Link } from 'react-router-dom';
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(firestore, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  
  // Handle message input
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get current user
    const { uid, displayName } = auth.currentUser;

    if (message.trim() !== "") {
      try {
        await addDoc(collection(firestore, 'messages'), {
          userId: uid,
          username: displayName || "Anonymous", // Save display name or default to Anonymous
          message,
          createdAt: serverTimestamp(), // Use Firestore server timestamp
        });
        setMessage(''); // Clear the input after sending
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div>
      {/* Chat message display */}
      <div className="messages-container" style={{ height: '300px',  overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: '10px', width: '80%' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Send</button>
      </form>
      <Link to="/CreateRoom"> create</Link>
    </div>
  );
};

export default Chat;