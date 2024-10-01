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
  const [showModal, setShowModal] = useState(false);
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

  const handleModalClose = () => {
    setShowModal(false);
    
  };
  return (
    <div className='bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen'>
      {}
      {user ? (
  <div>
    <div className='bg-gray-400 h-[50px] flex justify-between items-center px-5'>
<p className='font-bold'>Logged in as {user.displayName} </p>
<button className='bg-blue-500 px-6 py-3 text-white font-bold rounded-md'
onClick={()=> setShowModal(true)}
>Log Out</button>

    </div>
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
     
    </form>
  </div>
) : (
  <Link to="/login">Login</Link>
)}
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-lg font-bold">Are you sure you want to Log Out?</h2>
            {/* <p>Are you sure you want to Sign Out?</p> */}
             <div className='flex gap-4 items-center justify-center'>
               <button type="button"  className="mt-4 p-2 px-5 bg-blue-500 text-white rounded-lg" onClick={handleLogout}>Log Out</button>
                           <button
                className="mt-4 p-2 px-5 bg-blue-500 text-white rounded-lg"
                onClick={handleModalClose}
                           >
                Go back
                           </button>
             </div>
          </div>
        </div>
      )}
    
    </div>
  );
};
export default Chat;