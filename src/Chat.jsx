import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from './Auth/firebase'; // Your firebase config
import { auth } from './Auth/firebase'; // Firebase authentication
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [user, setuser] = useState(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
const navigate = useNavigate()
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
  
useEffect(()=>{
  onAuthStateChanged(auth, user=>{
    if(user){
      setuser(user)

    }else{
      setuser(null)
    }
  })
})

  // Handle message input
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log('No user is signed in');
    return;
  }
    // Get current user
    const { uid, displayName, photoURL } = auth.currentUser;

    if (message.trim() !== "") {
      try {
        await addDoc(collection(firestore, 'messages'), {
          userId: uid,
          username: displayName || "Anonymous", // Save display name or default to Anonymous
          message,
          photoURL : photoURL,
          createdAt: serverTimestamp(), // Use Firestore server timestamp
        });
        setMessage(''); // Clear the input after sending
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate("/login")
      // Redirect to login page or show a message
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {/* Chat message display */}

      {user ? (
  <>
    <div>Logged in as {user.displayName}</div>

    <div className="messages-container" style={{ height: '700px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {messages.map((msg) => {
        // Null check for user and msg.userId
        if (!msg || !user) return null;
        
        const isCurrentUser = msg.userId === user.uid;
        
        return (
          <div
            key={msg.id}
            className={`message ${isCurrentUser ? 'current' : 'other'}`}
            style={{
              display: 'flex',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
              marginBottom: '2px',
            }}
          >
            <div
              style={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: isCurrentUser ? '#DCF8C6' : '#FFF',
                color: isCurrentUser ? '#000' : '#333',
                textAlign: 'left',
                wordWrap: 'break-word',
              }}
            >
              <img
                src={user.photoURL || 'https://files.catbox.moe/ycindm.jpg'}
                alt="User avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
              />
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          </div>
        );
      })}
    </div>

    <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: '10px', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Send</button>
      <button type="button" onClick={handleLogout} style={{ padding: '10px', marginLeft: '10px' }}>Log Out</button>
    </form>
  </>
) : (
  <Link to="/login">Login</Link>
)}


    

      {/* Message input */}
     
   
    </div>
  );
};

export default Chat;