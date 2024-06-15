import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { Button, Card, Modal, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PostCard from '../../components/PostCard/PostCard'
import ReelCard from '../../components/ReelCard/ReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getSavePost, getUsersPostAction } from '../../Redux/Post/post.action';
import { getUsersReel } from '../../Redux/Reel/reel.action';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getUserByID, getUsersFollower, getUsersFollowing } from '../../Redux/User/user.action';
import SearchFollowUser from '../../components/SearchUser/SearchFollowUser';
import PopularUser from '../../components/homeright/PopularUser';
import { followUser } from '../../Redux/Auth/auth.action';

const tabs = [{ value: "post", name: "Posts" },
{ value: "reels", name: "Reels" },
{ value: "saved", name: "Saved" },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 0,
};

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
  maxHeight: '80vh',
  overflow: 'auto',
};

const Profile = () => {


  const { id } = useParams();
  const [value, setValue] = React.useState('post');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const [openFollower, setOpenFollower] = useState(false);

  const handleOpenFollower = () => {
    setOpenFollower(true);
  };

  const handleCloseFollower = () => {
    setOpenFollower(false);
  };

  const [openFollowing, setOpenFollowing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleOpenFollowing = () => {
    setOpenFollowing(true);
  };

  const handleCloseFollowing = () => {
    setOpenFollowing(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { auth, post, reel, userDetail } = useSelector(store => store);
  useEffect(() => {
    dispatch(getUsersPostAction(id))
  }, [dispatch, id])


  useEffect(() => {
    dispatch(getSavePost())
  }, [dispatch])


  useEffect(() => {
    dispatch(getUsersReel(id))
    dispatch(getUserByID(id))
    dispatch(getUsersFollower(id))
    dispatch(getUsersFollowing(id))
  }, [dispatch, id])


  const handleFollow = (userId) => {
    if (isFollowed) {
      dispatch(followUser(userId))
      setIsFollowed(false)
    }
    else{
      dispatch(followUser(userId))
      setIsFollowed(true)
    }
  }
  // console.log("==========>follower",userDetail.follower)


  return (
    <Card className='my-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[14rem]'>
          <img className='w-full h-[17rem] rounded-t-md' src={userDetail.user?.coverImage} alt="" />
        </div>
        <div className='px-5 flex justify-between items-start mt-14 h-[5rem]'>
          <Avatar className='tarnsform -translate-y-20 cursor-pointer' onClick={handleOpenProfile} sx={{ height: "9rem", width: "9rem", border: "2px solid rgb(250, 100, 50)" }} src={userDetail.user?.profileImage} />
          <Modal
            open={openProfile}
            onClose={handleCloseProfile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src={userDetail.user?.profileImage} alt="" />
              </Typography>

            </Box>
          </Modal>
          {auth.user?.id === userDetail.user?.id ? <Button onClick={handleOpen} sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button>
            : <Button onClick={() => handleFollow(userDetail.user.id)} sx={{ borderRadius: "20px" }} variant='outlined' >{isFollowed ? 'unfollow' : 'follow'}</Button>}
        </div>
        <div className='p-5'>
          <div>
            <h1 className=' font-bold text-xl'>{userDetail.user?.firstName + " " + userDetail.user?.lastName} <span className='text-sm font-normal'><LocationOnIcon />{auth.user.location}</span></h1>
            <p>@{userDetail.user?.firstName.toLowerCase() + "_" + userDetail.user?.lastName.toLowerCase()}</p>
          </div>
          <div className='flex gap-3 items-center py-3'>
            <span>{post?.usersPost.length} Post</span>
            <span className='cursor-pointer' onClick={handleOpenFollower}>{userDetail.user?.followers.length} Follower</span>

            {/*modal for followers list*/}
            <Modal
              open={openFollower}
              onClose={handleCloseFollower}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h2 className='text-center border-b-2'>Followers</h2>
                  <SearchFollowUser />

                  {userDetail.follower?.length > 0 ? userDetail.follower?.map((item) => <PopularUser  item={item} handleClose={handleCloseFollower}/>) : <div className='text-center'>No Followers</div>}
                </Typography>

              </Box>
            </Modal>
            <span className='cursor-pointer' onClick={handleOpenFollowing}>{userDetail.user?.following.length} Followings</span>
            {/*modal for following list*/}
            <Modal
              open={openFollowing}
              onClose={handleCloseFollowing}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h2 className='text-center border-b-2'>Following</h2>
                  <SearchFollowUser />

                  {userDetail.following?.length > 0 ? userDetail.following?.map((item) => <PopularUser item={item} handleClose={handleCloseFollowing} />) : <div className='text-center'>No Following</div>}
                </Typography>

              </Box>
            </Modal>
          </div>


        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                (item.value === 'saved' && auth.user?.id === userDetail.user?.id) ? (
                  <Tab value={item.value} label={item.name} wrapped key={item.value} />
                ) : (
                  auth.user?.id === userDetail.user?.id || item.value !== 'saved' ? (
                    <Tab value={item.value} label={item.name} wrapped key={item.value} />
                  ) : null
                )
              ))}
            </Tabs>
          </Box>
          <div className='flex justify-center'>
            {value === "post" ? (<div className='space-y-5 w-[70%] my-10'>
              {post?.usersPost.map((item) => (<div className='border border-slate-100 rounded-md'>
                <PostCard item={item} />
              </div>
              ))}
            </div>) : value === "reels" ? <div className='flex gap-2 flex-wrap justify-center'>
              {reel.reel.map((item) => <ReelCard item={item} />)}
            </div> : value === "saved" ? <div className='space-y-5 w-[70%] my-10'>
              {post?.savePost.map((item) => (<div className='border border-slate-100 rounded-md'>
                <PostCard item={item} />
              </div>))}
            </div> : (
              <div></div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  )
}

export default Profile
