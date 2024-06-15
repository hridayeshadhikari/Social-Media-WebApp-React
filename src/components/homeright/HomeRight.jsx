import React, { useEffect } from 'react';
import PopularUser from './PopularUser';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, getSuggestedUsers } from '../../Redux/Auth/auth.action';
import SearchFollowUser from '../SearchUser/SearchFollowUser';

const HomeRight = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getSuggestedUsers());
  }, [dispatch]);

  const suggestions = auth.users.filter(user => user.id !== auth.jwt.id);

  return (
    <div className='pr-5'>
      <SearchFollowUser />
      <Card className='overflow-auto' style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-semibold opacity-70 ml-3'>Suggestions for you</p>
        </div>
        <div>
          {suggestions.map((item) => <PopularUser key={item.id} item={item}/>)}
        </div>
      </Card>
    </div>
  );
}

export default HomeRight;
