import { Avatar, Button, Card, CardHeader, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { followUser, searchUser } from '../../Redux/Auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../Redux/Message/message.action';


const SearchFollowUser = () => {

    const dispatch = useDispatch();
    const { message, auth } = useSelector(store => store)
    const [username, setUsername] = useState("");
    const handleSearchUser = (e) => {
        setUsername(e.target.value)
        console.log("search user....", auth.searchUser)
        dispatch(searchUser(username))
    }

    const [isFollowed, setIsFollowed] = useState(false);
    const [searchedUserId, setSearchedUserId] = useState(null);

    useEffect(() => {
        // If auth.searchUser is an array and not empty, set the searched user id to the first item's id
        if (auth.searchUser && auth.searchUser.length > 0) {
            setSearchedUserId(auth.searchUser[0].id);
        } else {
            setSearchedUserId(null); // Reset searched user id if no search results
        }
    }, [auth.searchUser]); // Update searched user id when auth.searchUser changes

  

    useEffect(() => {
        // Check if searchedUserId exists and if it's included in the following list
        if (searchedUserId && auth.jwt.following?.includes(searchedUserId)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [searchedUserId, auth.jwt.following]);


   

    const handleFollow = (userId) => {
        if (isFollowed) {
            dispatch(followUser(userId));
            setIsFollowed(false);
        } else {
            dispatch(followUser(userId));
            setIsFollowed(true);
        }
    };


    return (
        <div>
            <div className='py-5 relative '>
                <input className='bg-transparent border border-grey outline-none w-full px-5 py-2 rounded-full'
                    placeholder='search user. . . .'
                    onChange={handleSearchUser}
                    type="text"
                />

                {
                    username && (
                        auth?.searchUser?.map((item) =>
                            <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer flex justify-between'>
                                <CardHeader

                                    avatar={<Avatar src={item.profileImage} />}

                                    title={item.firstName + " " + item.lastName}
                                    subheader={item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}

                                />
                                <IconButton aria-label="settings">
                        <Button size="small" onClick={() => handleFollow(item.id)}>
                            {isFollowed ? 'Unfollow' : 'Follow'} {/* Toggle between Follow and Unfollow */}
                        </Button>
                    </IconButton>
                            </Card>
                        )
                    )}
            </div>


        </div>
    )
}

export default SearchFollowUser
