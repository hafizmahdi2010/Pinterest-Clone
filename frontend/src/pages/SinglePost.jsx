import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import Avatar from 'react-avatar';
import { FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';

const SinglePost = () => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState(null);

  let { postId } = useParams();

  useEffect(() => {
    fetch(api_base_url + "/getPostData", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      setData(data.postData[0]);
      setIsLiked(data.postData[0].isYouLiked);
      // console.log(data.postData[0].isYouLiked)
    }).catch(err => console.error(err));
  }, []);

  const toggelLike = () => {
    fetch(api_base_url + "/toggelLike", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsLiked(data.isLiked);
        console.log(isLiked)
      }
      else {
        alert(data.msg);
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="px-[200px] min-h-[80vh] mt-4 mb-5 flex ">
        <div className='w-[40%] h-[80%]'>
          <img className='w-full h-full object-cover rounded-[20px]' src={data && data.postData ? "http://localhost:3000/uploads/" + data.postData.img : ""} alt="" />
        </div>

        <div className="right p-[10px] w-[50%] min-h-full ml-5 rounded-[20px]">
          <div className='flex justify-between items-center gap-4'>
            <div className="flex items-center gap-4">
              {
                isLoggedIn ?
                  isLiked == false ? 
                  <i className='text-[20px] cursor-pointer' onClick={()=>{toggelLike()}}><FaRegHeart /></i> : 
                  <i className='text-[20px] cursor-pointer text-red-500' onClick={()=>{toggelLike()}}><FaRegHeart /></i> : ""
              }
              <i className='text-[30px] cursor-pointer'><HiOutlineDotsHorizontal /></i>
              <i className='text-[20px] cursor-pointer'><LuUpload /></i>
            </div>

            <button className="btnNormal !text-white !bg-[#E60023]">Save</button>
          </div>

          <h3 className='text-3xl mt-5 font-[500]'>{data ? data.postData.title : ""}</h3>
          <p className='mt-4 text-[gray]'>{data ? data.postData.desc : ""}</p>

          <div className='flex items-start justify-between gap-3 mt-4'>
            <div className='flex items-start gap-2'>

              <Avatar name={data ? data.userData.name : ""} size="40" round="50%" className=' cursor-pointer' />
              <div>
                <p className='font-[500]'>{data ? data.userData.name : ""}</p>
                <p className='text-[14px] text-[gray]'>0 followers</p>
              </div>
            </div>

            {
              isLoggedIn ?
                <button className="btnNormal">Follow</button> : ""
            }
          </div>

          <h3 className='text-xl font-[500] mt-4'>2 Comments</h3>

          <div className="comments pt-4">

            <div className="comment flex items-start gap-3 mb-2">
              <Avatar name="Wim Mostmans" size="30" round="50%" className=' cursor-pointer' />
              <p><b>shravan</b> How come Porsche 911 GT3RS isn't mentioned? Or R33 | R34 or WRX or E30/E36 Bruh, give a man this and a garage and he'll be the happiest man on earth</p>
            </div>

            <div className="comment flex items-start gap-3 mb-2">
              <Avatar name="Wim Mostmans" size="30" round="50%" className=' cursor-pointer' />
              <p><b>shravan</b> How come Porsche 911 GT3RS isn't mentioned? Or R33 | R34 or WRX or E30/E36 Bruh, give a man this and a garage and he'll be the happiest man on earth</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SinglePost