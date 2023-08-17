import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage.js';

import ChatSetupPage from '../ChatSetupPage/ChatSetupPage';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

export default function App() {
	const [user, setUser] = useState(getUser());
	const [spotifyToken, setSpotifyToken] = useState(null);

	// const SPOTIFY_CLIENT_ID = process.env.SPOTIFYID;
	// const SPOTIFY_CLIENT_ID_SECRET = process.env.SPOTIFYCLIENTSECRET;

	// useEffect(() => {
	// 	async function getSpotifyToken() {
	// 		const response = await fetch('https://accounts.spotify.com/api/token', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 				Authorization: `Basic ${btoa(
	// 					`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_ID_SECRET}`
	// 				)}`
	// 			},
	// 			body: 'grant_type=client_credentials'
	// 		});
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setSpotifyToken(data.access_token);
	// 		} else {
	// 			console.error(
	// 				'Failed to fetch Spotify access token:',
	// 				response.statusText
	// 			);
	// 		}
	// 	}
	// 	getSpotifyToken();
	// }, []);

	return (
		<main className={styles.App}>
			{user ? (
				<>
					<Routes>
						{/* client-side route that renders the component instance if the path matches the url in the address bar */}

						<Route
							path="/chat"
							element={
								<ChatSetupPage
									user={user}
									setUser={setUser}
									socket={socket}
									spotifyToken={spotifyToken}
								/>
							}
						/>

						<Route
							path="/orders/new"
							element={
								<NewOrderPage
									user={user}
									setUser={setUser}
									spotifyToken={spotifyToken}
                  setSpotifyToken={setSpotifyToken}
								/>
							}
						/>
						{/* <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} /> */}

						{/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}

						<Route path="/*" element={<Navigate to="/orders/new" />} />

						{/* <Route path='/*' element={<Navigate to='/' />} /> */}
					</Routes>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
