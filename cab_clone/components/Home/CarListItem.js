import Image from 'next/image'
import React from 'react'
import "./CarListItem.css"
import { HiUser } from "react-icons/hi";
function CarListItem({car, dist}) {
  return (
    <div>
        <div className='m'>
        <div style={{display:'flex', alignItems:'center'}}>
            <Image src={car.image} width={70} height={70} />
            <div> <h2 className='carname'>{car.name}
                    <span className='span'>
                        <HiUser/>{car.seats}
                    </span>
            </h2>
            <p className='cardesc'>{car.desc}</p>
            
             </div>
            
        </div>
        <h2 className='carname'>RS.{(car.price*dist/1000).toFixed(2)}</h2>
    </div></div>
  )
}

export default CarListItem