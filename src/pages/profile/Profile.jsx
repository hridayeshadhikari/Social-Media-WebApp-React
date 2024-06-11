import React, { useEffect } from 'react'
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
import { getUserByID } from '../../Redux/User/user.action';

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
  }, [dispatch, id])


  // console.log("=============>",auth.user?.id===userDetail.user?.id)


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
            : <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>}
        </div>
        <div className='p-5'>
          <div>
            <h1 className=' font-bold text-xl'>{userDetail.user?.firstName + " " + userDetail.user?.lastName} <span className='text-sm font-normal'><LocationOnIcon />{auth.user.location}</span></h1>
            <p>@{userDetail.user?.firstName.toLowerCase() + "_" + userDetail.user?.lastName.toLowerCase()}</p>
          </div>
          <div className='flex gap-3 items-center py-3'>
            <span>{post?.usersPost.length} Post</span>
            <span>{userDetail.user?.followers.length} Follower</span>
            <span>{userDetail.user?.following.length} Followings</span>
          </div>


        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (<Tab value={item.value} label={item.name} wrapped />))}
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
