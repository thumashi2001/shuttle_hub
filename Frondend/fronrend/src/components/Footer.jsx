import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
            <img src={assets.logo} className='mb-5 w-32'alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
             We are go-to destination for premium sports gear, specializing in badminton equipment and more. Explore our wide range of products, customize t-shirts, and enjoy secure shopping with fast delivery. Elevate your game with Shuttle Hub today!
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>011-2345778</li>
                <li>shuttlehub@gmail.com</li>
                <li>www.shuttlehub.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>
             Copyright 2023@shuttlehub.com. All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
