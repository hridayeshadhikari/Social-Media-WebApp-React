

import React, { useEffect, useRef, useState } from 'react';
import "./Reels.css"
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../Redux/Auth/auth.action';

function ReelCards({ item }) {
  
  // console.log("=============>", item.video)

  const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const [isFollowed, setIsFollowed] = useState(false); 

   
    useEffect(() => {
        setIsFollowed(auth?.jwt.following?.includes(item.user.id));
    }, [auth.jwt.following, item.user.id]);

    const handleFollow = (userId) => {
        if (isFollowed) {
            dispatch(followUser(userId));
            setIsFollowed(false);
        } else {
            dispatch(followUser(userId));
            setIsFollowed(true);
        }
    };
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleVideoEnded = () => {
    if (videoRef.current) {
      // Replay the video when it ends
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <video
        
        ref={videoRef}
        src={item.video}
        onEnded={handleVideoEnded}
        className="reels-container"
        onClick={handleClick}
      />
      <div className="caption" style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', color: 'white', padding: '8px' }}>
        <div className='flex-col justify-start items-start'>
          <p>@{item.user.firstName.toLowerCase()}_{item.user.lastName.toLowerCase()}  <Button onClick={() => handleFollow(item.user.id)} variant='outlined' sx={{ color: "white", width: '90px', height: '25px',marginLeft:'10px' }}> {isFollowed ? 'Unfollow' : 'Follow'}</Button></p>
          <p style={{ textAlign: 'start' }}>{item.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default ReelCards;
