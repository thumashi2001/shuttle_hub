import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src ={assets.about_img} alt=""/>
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
       <p>Welcome to Shuttle Hub, your one-stop destination for high-quality badminton gear and sports equipment. We are passionate about providing players of all levels with the best rackets, shuttlecocks, shoes, and accessories to enhance their game. Our carefully curated collection ensures durability, performance, and affordability, making it easier for athletes to find the right gear for their needs.</p>
       <p>At Shuttle Hub, we prioritize customer satisfaction with a seamless shopping experience, secure payments, and reliable order tracking. Whether you're a beginner or a professional, our expanding range of products is designed to support your sports journey. Join us and elevate your game with the best equipment in the market!</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>At Shuttle Hub, our mission is to provide high-quality badminton and sports equipment at affordable prices while ensuring a seamless shopping experience. We aim to support athletes of all levels by offering durable, performance-driven products that enhance their game.

We are committed to customer satisfaction, innovation, and reliability, making it easy for sports enthusiasts to access the best gear. Through continuous expansion and excellence in service, we strive to be the go-to destination for all badminton and sports needs.</p>
      
      </div>
      </div>
    </div>
  )
}

export default About
