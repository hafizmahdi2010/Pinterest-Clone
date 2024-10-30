import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate()

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((res)=>res.json()).then((data)=>{
      if(data.success){
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isLoggedIn", true);
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
      else{
        setError(data.message);
      }
    })
  }

  return (
    <>
      <div className="container bg-[#f4f4f4] flex flex-col items-center justify-center min-h-screen">

        <form onSubmit={createUser} className='flex flex-col w-[25vw] h-[auto] px-[50px] bg-[#fff] rounded-[10px] p-[20px]'>

          <img className='w-[60px] h-[60px] self-center mb-3' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="" />
          <h3 className='text-center text-2xl font-[500] mb-5'>Login in to see more</h3>

          <div className="inputBox2 mt-3">
            <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email' />
          </div>

          <div className="inputBox2 mt-3">
            <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder='Password' />
          </div>

          <p className='text-[13px] mt-2 text-red-500'>{error}</p>

          <p className='my-2'>Don't Have An Account <Link className='text-blue-500' to="/signUp">Sign Up</Link></p>

          <button className='bg-[#e60023] text-[#fff] p-2 mt-1 rounded-[30px]'>Login</button>

        </form>

      </div>
    </>
  )
}

export default Login