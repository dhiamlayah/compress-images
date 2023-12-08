import { useState } from "react";
import axios from "axios"

const UplodeImage = () => {
  const sendImage = async()=>{
      await axios.get(`http://localhost:8000/image?url=${url}&width=${width}&height=${height}`).then((res)=>{
        console.log(res.data)
      }).catch((error)=>{console.log(error)})
    
    } 
  
  const handleClick = ()=>{
      sendImage()
  }
  
  const [width,setWidth]=useState()
  const [height,setHeith]=useState()
  const [url,setUrl]=useState()
  console.log(url)
  return (
        <div className=" form-control-lg position-absolute top-50 start-50 translate-middle">
         <input className="form-control w-100 " value={url} onChange={(e)=>{setUrl(e.target.value)}} type="text" placeholder="URl of image" aria-label=".form-control-lg example"/>

         <label htmlFor="Width " className="form-label pt-5">Width</label>
         <input type="number" className="form-control" value={width} onChange={(e)=>{setWidth(e.target.value)}} id="Width"/>

         <label htmlFor="height " className="form-label pt-5">height</label>
         <input type="number" className="form-control"value={height} onChange={(e)=>{setHeith(e.target.value)}}  id="height"/>

        <button className="btn btn-outline-primary m-5" onClick={()=>{handleClick()}}>send </button>
        </div>
      );
}
 
export default UplodeImage;