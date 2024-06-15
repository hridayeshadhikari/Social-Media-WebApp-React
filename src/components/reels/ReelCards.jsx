import React, { useEffect, useRef, useState } from 'react';
import "./Reels.css"
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../Redux/Auth/auth.action';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Favorite } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createReelComment, likeReel } from '../../Redux/Reel/reel.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '88%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: .5,
  overflow: 'auto',
};

function ReelCard({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentText, setCommentText] = useState('')
  const [currentReelId, setCurrentReelId] = useState(item.id); // Track current playing reel id
  const videoRef = useRef(null);

  const handleCreateReelComment = (description) => {
    const reqData = {
      reelId: 1,
      data: { description }
    }
    dispatch(createReelComment(reqData))
    setCommentText('')
  }

  useEffect(() => {
    setIsFollowed(auth?.jwt.following?.includes(item.user.id));
  }, [auth.jwt.following, item.user.id]);

  const handleFollow = (userId) => {
    setIsFollowed(!isFollowed);
    dispatch(followUser(userId));
  };

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
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Intersection Observer callback function
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If the video is in view, restart it
        if (!isPlaying && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }
    });
  };



  // Create the Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    // Cleanup function
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickIcn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reelLikeHandler = (reelId) => {
    dispatch(likeReel(reelId));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Post',
          text: `Check out this post by ${item.user.firstName} ${item.user.lastName}: ${item.caption}`,
          url: window.location.href
        });
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
    handleClose();
  };

  return (
    <div className='flex'>
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
            <p>@{item.user.firstName.toLowerCase()}_{item.user.lastName.toLowerCase()}  {auth.user?.id !== item.user?.id ? <Button onClick={() => handleFollow(item.user.id)} variant='outlined' sx={{ color: "white", width: '90px', height: '25px', marginLeft: '10px' }}> {isFollowed ? 'Unfollow' : 'Follow'}</Button> : <></>}</p>
            <p style={{ textAlign: 'start' }}>{item.caption}</p>
          </div>
        </div>
      </div>

      <div className='flex-col' style={{ position: 'absolute', top: '19rem', right: '19rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ThumbUpOffAltIcon onClick={() => reelLikeHandler(currentReelId)} className='mb-7 cursor-pointer' sx={{ fontSize: '2rem' }} />
          <ThumbDownOffAltIcon className='mb-7 cursor-pointer' sx={{ fontSize: '2rem' }} />
          <InsertCommentIcon onClick={handleOpen} className='mb-7 cursor-pointer' sx={{ fontSize: '2rem' }} />
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="flex flex-col justify-between h-full">
              <div className='sticky top-0 w-full bg-white z-10'>
                <div className='flex items-center space-x-14'>
                  <IconButton onClick={handleCloseModal}>
                    <CloseIcon />
                  </IconButton>
                  <p>Comments</p>
                </div>
              </div>
              <div className="flex items-start border-b-2 m-1 mt-5">
                <div className='flex items-center space-x-2'>
                  <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}></Avatar>
                  <div className='flex-col'>
                    <p className='text-sm font-bold'>
                      Hridayesh Adhikari
                    </p>
                    <p className='text-sm'> nice pic</p>
                  </div>
                </div>
                <div className='flex-col ml-7 -mt-1 '>
                  <IconButton aria-label="like-comment">
                    {true ? <Favorite sx={{ color: "red", fontSize: '1.2rem' }} /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <p className='text-xs -mt-2'>10 likes</p>
                </div>
              </div>
              <div className='flex items-center justify-between sticky -bottom-1 w-full bg-white z-10 '>
                <Avatar />
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateReelComment(e.target.value)
                      console.log("enter pressed...", e.target.value)
                    }
                  }} className='ml-3 outline-none bg-transparent border border-[#3b4054] rounded-full p-2 flex-grow' type="text" placeholder='write your comment....' />

                <SendIcon onClick={()=>handleCreateReelComment(commentText)} className='ml-3 cursor-pointer transform -translate-x-10' sx={{ color: 'grey' }} />
              </div>
            </Box>
          </Modal>
          <ShareIcon className='mb-7 cursor-pointer ' sx={{ fontSize: '2rem' }} />
          <MoreVertIcon
            className='cursor-pointer'
            aria-label="more"
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClickIcn}
            sx={{ fontSize: '2rem' }}
          />
          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Save</MenuItem>
            <MenuItem onClick={handleShare}>Share</MenuItem>
            <MenuItem onClick={handleClose}>Cancel</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ReelCard;
