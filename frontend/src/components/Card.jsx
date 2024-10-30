import React from 'react'
import Avatar from "react-avatar"
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  let { img } = item;
  const naviagate = useNavigate();
  return (
    <>
      <div className="card" onClick={()=>{naviagate("/singlePost/"+item.postData._id)}}>
        <img className='mainImg' src={"http://localhost:3000/uploads/"+item.postData.img} alt="" />
        <p className='font-[500] line-clamp-2 w-[90%]'>{item.postData.title}</p>
        <p className='text-[gray] text-[14px] line-clamp-2 w-[90%]'>{item.postData.desc}</p>
        <div className='flex items-center gap-[10px] mt-2'>
        <Avatar name={item.userData.name} size='30' round="50%" className=' cursor-pointer'/>
          <p className='mb-3'>{item.userData.name}</p>
        </div>
      </div>
    </>
  )
}

export default Card