import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';


async function fethAPI() {
  try {
    const { data } = await axios.get('https://randomuser.me/api');
    // handle success
    console.log(data);
    return data;
  } catch (error) {
    // handle error
    console.log(error);
  }
}

function getName(user) {
    const {name : { title,first,last }} = user;
return `${title} ${first} ${last}`;
}

 function PageAPI() {
    const [counter ,setCounter] = useState(0);
    const [data ,setData] = useState("");
    const [user,setUser] =useState([]);
    
    //สร้าง function แยกเพื่อดึงข้อมูลอีกรอบในการใช้ onclick
    const addUser = () => {
        fethAPI().then(randomData => {
            // setData(randomData);

            //ใช้ ... เพื่อเก็บข้อมูลเดิมและเพิ่มข้อมูลใหม่เข้าไป
            const addNewUser = [
                ...user,
                ...randomData.results,
            ]
            //แล้วส่ง addNewUser เข้า setUser แทน
            setUser(addNewUser);
        })
    }

 //ใช้useEffect เพื่อเวลาหน้าเว็บมีการเรนเดอร์เสร็จ ให้มันทำการดึงข้อมูลแสดงผล
    useEffect( () => {
        addUser();
    },[] )
  return (
    
    <div className="bg-bg bg-cover h-screen">
        {/* <p> {counter}</p>
        <button onClick={()=> setCounter(counter + 1)}>ADD</button>
        <button onClick={ () => setCounter(counter - 1)}>Delete</button> */}
        <div className="grid justify-center pt-10">
        <button onClick={()=> addUser()}  
              type="button"
             className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Random User
              </button>
      
           
        </div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-4  lg:grid-cols-6 xl:gap-x-8 mx-20 mt-10">
      {user.map((info, index) => (
               <div key={index} className="">
                 <img src={info.picture.large} alt='' className="rounded-xl w-60"/>
                 <p className="text-2xl">
                    {getName(info)}
                 </p>
                 <p>
                  Age : {info.registered.age}
                 </p>
                  <p>
                  City : {info.location.city}
                 </p>
               </div> 
            ))} 
      </div>
      
       
        
        
    </div>
  )
}
export default PageAPI;