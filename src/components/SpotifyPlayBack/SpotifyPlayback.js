import React, { useEffect, useState } from 'react';

const SpotifyPlayback = ({ accessToken, trackUri }) => {
    const [player, setPlayer] = useState(null);
  
    useEffect(() => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Your App Name',
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
        });
  
        player.connect().then((success) => {
          if (success) {
            console.log('Connected to Spotify player');
            setPlayer(player);
          }
        });
      };
    }, [accessToken]);
  
    return (
      <div>
        {/* Render your playback controls and UI here */}
        here is playback controls
      </div>
    );
  };
  
  export default SpotifyPlayback;