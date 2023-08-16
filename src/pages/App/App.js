import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage.js';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

import ChatSetupPage from '../ChatSetupPage/ChatSetupPage';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

export default function App() {
	const [user, setUser] = useState(getUser());
	const [spotifyToken, setSpotifyToken] = useState(null);

	const SPOTIFY_CLIENT_ID = '6e5e323692834ac8bd78f79025e6a945';
	const SPOTIFY_CLIENT_ID_SECRET = '9e8514cb9afa43d3982b1960266b172a';

	useEffect(() => {
		async function getSpotifyToken() {
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(
						`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_ID_SECRET}`
					)}`
				},
				body: `grant_type=client_credentials`,
			});
			if (response.ok) {
				const data = await response.json();
				setSpotifyToken(data.access_token);
			} else {
				console.error(
					'Failed to fetch Spotify access token:',
					response.statusText
				);
			}
		}
    getSpotifyToken();
	}, []);

	return (
		<main className={styles.App}>
			{user ? (
				<>
					<Routes>
						{/* client-side route that renders the component instance if the path matches the url in the address bar */}

						<Route
							path="/chat"
							element={
								<ChatSetupPage user={user} setUser={setUser} socket={socket} spotifyToken={spotifyToken}/>
							}
						/>

						{/* <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} /> */}

						{/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}

						{/* <Route path="/*" element={<Navigate to="/orders/new" />} /> */}

						<Route path="/*" element={<Navigate to="/chat" />} />
					</Routes>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
