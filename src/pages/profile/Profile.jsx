import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { Button, Card} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PostCard from '../../components/PostCard/PostCard'
import ReelCard from '../../components/ReelCard/ReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getSavePost, getUsersPostAction } from '../../Redux/Post/post.action';
import { getUsersReel } from '../../Redux/Reel/reel.action';
import ViewStoryModal from '../../components/middlepart/ViewStoryModal';

const tabs = [{ value: "post", name: "Posts" },
{ value: "reels", name: "Reels" },
{ value: "saved", name: "Saved" },
]



const Profile = () => {

  

  const [value, setValue] = React.useState('post');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ViewStory, setOpenViewStory] = React.useState(false);
  const handleOpenViewStory = () => setOpenViewStory(true);
  const handleCloseViewStory = () => setOpenViewStory(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { auth, post, reel } = useSelector(store => store);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUsersPostAction(auth?.user.id))

  }, [dispatch, auth?.user.id])

  useEffect(() => {
    dispatch(getSavePost())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsersReel(auth.jwt.id))
  }, [dispatch])

  // console.log("=====--------->", reel)

  console.log("####$$$$$$")

  return (
    <Card className='my-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[14rem]'>
          <img className='w-full h-[17rem] rounded-t-md' src={auth.user.coverImage} alt="" />
        </div>
        <div className='px-5 flex justify-between items-start mt-14 h-[5rem]'>
          <Avatar  className='tarnsform -translate-y-20 cursor-pointer' sx={{ height: "9rem", width: "9rem", border: "2px solid rgb(250, 100, 50)" }} src={auth.user.profileImage} />
          
          {true ? <Button onClick={handleOpen} sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button>
            : <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>}
        </div>
        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
            <p>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
          </div>
          <div className='flex gap-3 items-center py-3'>
            <span>{post?.posts.length} Post</span>
            <span>{auth?.user.followers.length} Follower</span>
            <span>{auth?.user.following.length} Followings</span>
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
      <ViewStoryModal handleClose={handleCloseViewStory} open={ViewStory} userId={auth.jwt.id} />
    </Card>
  )
}

export default Profile
