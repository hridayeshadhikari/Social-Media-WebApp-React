
import React, { useEffect, useState } from 'react';
import './Reels.css'
import ReelCards from './ReelCards';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReels } from '../../Redux/Reel/reel.action';

const Reels = () => {

  
  const { reel, loading, error, newComment } = useSelector(state => state.reel);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllReels())
  }, [dispatch,newComment])
  

  
  return (
    <div>
      <div className="App">
      <div className="video-container">
        {reel.slice().reverse().map((item) => (
          <div className="video-item" >
            <ReelCards key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Reels
