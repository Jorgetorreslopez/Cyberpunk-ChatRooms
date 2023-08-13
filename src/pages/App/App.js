import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage.js';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import ChatPage from '../ChatPage/ChatPage';

import socketIO from 'socket.io-client'
const socket = socketIO.connect('http://localhost:8000');

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className={styles.App}>
      { user ?
        <>
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            <Route path="/chat" element={<ChatPage user={user} setUser={setUser} socket={socket} />} />
            {/* <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} /> */}
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/chat" />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}