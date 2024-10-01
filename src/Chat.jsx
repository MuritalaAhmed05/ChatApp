import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from './Auth/firebase';
import { auth } from './Auth/firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Chat = () => {
  const [user, setuser] = useState(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    const q = query(collection(firestore, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsubscribe();
  }, []);
useEffect(()=>{
  onAuthStateChanged(auth, user=>{
    if(user){
      setuser(user)
      // console.log("User photoURL:", user.photoURL); 
    }else{
      setuser(null)
    }
  })
})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
  if (!currentUser) {
    console.log('No user is signed in');
    return;
  }
    const { uid, displayName, photoURL } = auth.currentUser;
    // console.log("photoURL at message submission:", photoURL);
    if (message.trim() !== "") {
      try {
        await addDoc(collection(firestore, 'messages'), {
          userId: uid,
          username: displayName || "Anonymous",
          message,
          photoURL : photoURL,
          createdAt: serverTimestamp(), 
        });
        setMessage('');
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
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div>
      {}
      {user ? (
  <>
    <div>Logged in as {user.displayName}</div>
    <div className="messages-container" style={{ height: '700px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {messages.map((msg) => {
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
                src={msg.photoURL || 'https://files.catbox.moe/ycindm.jpg'}
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
      {}
    </div>
  );
};
export default Chat;