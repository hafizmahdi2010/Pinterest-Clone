import React, { useEffect, useState } from 'react'
import Card from './Card'
import { api_base_url } from '../helper';

const NewOnPinterest = () => {

  const [data, setData] = useState("");

  const getPosts = () => {
    fetch(api_base_url + "/getPosts").then(res=>res.json()).then(data=>{
      setData(data.posts)
    })
  };

  useEffect(() => {
    getPosts()
  }, [])
  

  return (
    <div className='px-[100px] mt-5 font-[500]'>
      <h3 className='text-2xl mb-5'>What's new on Pinterest</h3>
      <div className="cards">
        {/* <Card item={{ img: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" }} /> */}
        {
          data && data.map((item, index) => {
            return <Card key={index} item={item} />
          })
        }
      </div>
    </div>
  )
}

export default NewOnPinterest