import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chat from './Chat';
import Register from './Auth/App';
import Login from './Auth/Login';
import Reset from './Auth/Reset';
import ChatRoomList from './listroom';
import CreateRoom from './createroom';
import MainChat from './MainChat';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Router>
    <Routes>
        <Route path="/" element={<Register />} /> {/* Changed component to element */}
        <Route path="/login" element={<Login />} /> {/* Changed component to element */}
        <Route path="/reset" element={<Reset />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/ChatRoomList" element={<ChatRoomList />} />
        <Route path="/CreateRoom" element={<CreateRoom />} />
        <Route path="/MainChat" element={<MainChat />} />
      {/* <Route path="*" component={App} /> */}
    </Routes>
   </Router>
  </React.StrictMode>
);

// import { signOut } from 'firebase/auth';

// const handleLogout = async () => {
//   try {
//     await signOut(auth);
//     console.log('User signed out');
//     // Redirect to login page or show a message
//   } catch (error) {
//     console.error('Error signing out:', error);
//   }
// };
