
import React, { useEffect, useState } from 'react';
import './Reels.css'
import ReelCards from './ReelCards';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReels } from '../../Redux/Reel/reel.action';

const Reels = () => {

  const videoUrls = [
    
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4"
    
  ];
  const [observer, setObserver] = useState(null);

  const { reel } = useSelector(store => store)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllReels())
  }, [dispatch])
  console.log("reels========>", reel)
  // console.log("====>", reel.reel[0])

  // const res=reel.reel.map((item)=>{
  //   console.log("============",item)
  // })

  // console.log(res)

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        let ele = entry.target.querySelector("video");
        if (ele) {
          ele.play().then(() => {
            if (!ele.paused && !entry.isIntersecting) {
              ele.pause();
            }
          }).catch(error => {
            // Handle play error if any
            console.error('Error playing video:', error);
          });
        }
      });
    };
    

    const newObserver = new IntersectionObserver(callback, { threshold: 0.6 });
    setObserver(newObserver);

    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    if (observer) {
      const elements = document.querySelectorAll(".video-container > .video-item");
      elements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, [observer]);
  return (
    <div>
      <div className="App">
      <div className="video-container">
        {reel.reel.map((item) => (
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
