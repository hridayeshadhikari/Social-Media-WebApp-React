import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../Redux/Auth/auth.action';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Favorite } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createReelComment, getAllReels, likeReel, likeReelComment } from '../../Redux/Reel/reel.action';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeComment } from '../../Redux/Post/post.action';
import { isReelLiked } from '../../Utils/isReelLiked';
import { useParams } from 'react-router-dom';
import { isCommentLiked } from '../../Utils/isCommentLiked';

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
  const { auth ,reel} = useSelector((store) => store);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentText, setCommentText] = useState('')
  const [currentReelId, setCurrentReelId] = useState(item.id); // Track current playing reel id
  const videoRef = useRef(null);
  

  const handleCreateReelComment = (description) => {
    const reqData = {
      reelId: item.id,
      data: { description }
    }
    dispatch(createReelComment(reqData))
    dispatch(getAllReels())
    setCommentText('')
  }

  useEffect(() => {
    setIsFollowed(auth?.jwt.following?.includes(item.user.id));
  }, [auth.jwt.following, item.user.id]);

  const handleFollow = (userId) => {
    setIsFollowed(!isFollowed);
    dispatch(followUser(userId));
  };

  const [currentPlayingReelId, setCurrentPlayingReelId] = useState(null);

  const handleClick = () => {
    if (videoRef.current) {
      // Pause current playing video if different from clicked video
      if (currentPlayingReelId !== item.id && currentPlayingReelId !== null) {
        const prevVideo = document.getElementById(`video-${currentPlayingReelId}`);
        if (prevVideo) {
          prevVideo.pause();
          prevVideo.currentTime = 0; // Reset current time to start of the video
        }
      }
  
      if (isPlaying) {
        videoRef.current.pause();
        setCurrentPlayingReelId(null);
      } else {
        videoRef.current.play();
        setCurrentPlayingReelId(item.id);
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset current time to start of the video
      videoRef.current.pause();
      setCurrentPlayingReelId(null);
    }
  };
  

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

  
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        if (!isPlaying && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
          setCurrentPlayingReelId(item.id); 
        }
      } else {
        if (currentPlayingReelId === item.id && videoRef.current) {
          videoRef.current.pause();
          setCurrentPlayingReelId(null); 
        }
      }
    });
  };







  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickIcn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const likeCommentHandler=(commentId)=>{
    dispatch(likeComment(commentId))
  }

  const likeReelHandler=(reelId)=>{
    dispatch(likeReelComment(reelId));
  }

  console.log("==========>item",item)

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
            <p>@{item.user.firstName.toLowerCase()}_{item.user.lastName.toLowerCase()}  </p>
            <p style={{ textAlign: 'start' }}>{item.caption}</p>
          </div>
          <div className='flex-col' style={{ position: 'absolute', right: '-5rem', bottom: '-4rem', transform: 'translateX(80%) translatey(-50%)', display: 'flex', alignItems: 'center' }}>
            {isReelLiked(auth.user?.id,item) ? <FavoriteIcon sx={{color:'red'}} onClick={()=>likeReelHandler(item.id)} style={{ marginRight: '10px', marginBottom: '1.5rem', cursor: 'pointer', fontSize: '2rem' }}/> : <FavoriteBorderIcon onClick={()=>likeReelHandler(item.id)} style={{ marginRight: '10px', marginBottom: '1.5rem', cursor: 'pointer', fontSize: '2rem' }} />}
            <InsertCommentIcon onClick={handleOpen} style={{ cursor: 'pointer', fontSize: '2rem', marginBottom: '1.5rem' }} />
            <ShareIcon style={{ marginRight: '10px', marginBottom: '1.5rem', cursor: 'pointer', fontSize: '2rem' }} />
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
              <MenuItem onClick={handleClose}>copy link</MenuItem>
              <MenuItem onClick={handleClose}>share</MenuItem>
              <MenuItem onClick={handleClose}>cancel</MenuItem>
            </Menu>

          </div>
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
              {item.comments.slice().reverse().map((comment) => <div className="flex items-start border-b-2 m-1 mt-5">
                <div className='flex items-center space-x-2'>
                  <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }} src={comment.user?.profileImage} ></Avatar>
                  <div className='flex-col'>
                    <p className='text-sm font-bold'>
                      {comment.user?.firstName}_{comment.user?.lastName}
                    </p>
                    <p className='text-sm'>{comment.description}</p>
                  </div>
                </div>
                <div className='flex-col ml-7 -mt-1 '>
                  <IconButton onClick={()=>likeCommentHandler(comment.id)} aria-label="like-comment">
                    {isCommentLiked(auth.user?.id,comment) ? <Favorite  sx={{ color: "red", fontSize: '1.2rem' }} /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <p className='text-xs -mt-2'>{comment.liked?.length} Likes</p>
                </div>
              </div>)}
              <div className='flex items-center justify-between sticky -bottom-1 w-full bg-white z-10 '>
                <Avatar src={auth.user.profileImage}/>
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateReelComment(e.target.value)
                      console.log("enter pressed...", e.target.value)
                    }
                  }} className='ml-3 outline-none bg-transparent border border-[#3b4054] rounded-full p-2 flex-grow' type="text" placeholder='write your comment....' />

                <SendIcon onClick={() => handleCreateReelComment(commentText)} className='ml-3 cursor-pointer transform -translate-x-10' sx={{ color: 'grey' }} />
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ReelCard;
