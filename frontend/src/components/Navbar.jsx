import React from 'react'
import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex items-center h-[80px] px-[30px]">
        <img className='w-[120px]' src={logo} alt="" />

        <div className="btns ml-7 flex items-center font-[500] gap-[25px]">
          <button>Today</button>
          <button>Watch</button>
          <button>Explore</button>
        </div>

        <div className="inputBox w-[57vw] rounded-[30px] ml-5">
          <i className='ml-3 text-[gray]'><FaSearch /></i>
          <input className='rounded-[30px]' type="text" placeholder='Search here...!' />
        </div>

        <div className="flex ml-4 items-center gap-[10px]">
          <button className='btnNormal'>Login</button>
          <button className='btnNormal !bg-[#E60023] text-white'>Sign Up</button>
          <i className='ml-2'><IoIosArrowDown /></i>
        </div>
      </div>
    </>
  )
}

export default Navbar