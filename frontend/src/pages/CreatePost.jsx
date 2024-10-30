import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { MdOutlineFileUpload } from "react-icons/md";
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const createPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("userId", localStorage.getItem("userId"));

    fetch(api_base_url + "/createPost", {
      mode: "cors",
      method: "POST",
      body: formData
    }).then(res => res.json()).then(data => {
      if (data.success) {
        alert("Post Created Successfully");
        navigate("/")
      }
      else {
        alert("Error Creating Post");
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="px-[100px] min-h-[80vh]">
        <h3 className='text-xl font-[500] my-4'>Create Pin</h3>

        <div className='px-[50px] h-full w-full flex '>
          <input type="file" onChange={(e) => {
            setImage(e.target.files[0]);
            document.getElementById('showImg').src = URL.createObjectURL(e.target.files[0]);
          }} hidden id='realImg' />
          <div onClick={() => {
            document.getElementById('realImg').click();
          }} className="imgCon min-h-[70vh] flex items-center flex-col justify-center bg-[#E9E9E9] rounded-[20px] cursor-pointer w-[30%]">
            <img id='showImg' />
            {
              image === "" ?
                <>
                  <i className='text-[30px]'><MdOutlineFileUpload /></i>
                  <p className='text-center mt-2'>choose a file or drag and drop <br /> it here</p>
                </> : ""
            }
          </div>

          <form onSubmit={createPost} className='h-full ml-3 p-3 w-[40vw]'>
            <p className='text-[gray] text-[13px] mb-2'>Title</p>
            <div className="inputBox2">
              <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" placeholder='Add a title' />
            </div>

            <p className='text-[gray] text-[13px] mb-2 mt-4'>Description</p>
            <div className="inputBox2">
              <textarea onChange={(e) => { setDesc(e.target.value) }} value={desc} placeholder='Enter Description'></textarea>
            </div>

            <button className="btnNormal w-[38.5vw] text-white mt-3 !bg-[#E60023]">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePost