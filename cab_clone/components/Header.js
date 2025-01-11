import React from 'react'
import { FaTaxi } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import logo from "../public/logo.png"
import Image from 'next/image';
import "./Header.css"
import { UserButton } from '@clerk/nextjs';


function Header  (){
    const headerMenu=[
        {
            id:1,
            name: 'ride',
            icon:'/taxi.png'
        },
        {
            id:2,
            name: 'package',
            icon:'/parcel.png'

        }
    ]
  return (
  
    <div className='top'>
      <div className='main'>
        <Image src='/logo.png' width={70} height={70}/>
        <div className='item'>
           { headerMenu.map((item)=>(
              <div className='item1'>
                {
                <><Image src={item.icon} width={35} height={35} id='img' />
                <h2 className='title'>{item.name}</h2>
                </>
            }
              </div>
            ))}
        </div>
      </div>
     <div className='userbutton'></div>

    </div>
  )
}

export default Header