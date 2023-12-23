import React from 'react'
import '../style/style.css'
import Clips from './utils/clips.jsx'
import '../style.css'
import SocialLink from './utils/sociallink.jsx'
const Hero = ({ heroapi: { title, subtitle, btntext, img, sociallinks, videos } }) => {


  return (
    <div className='top-container'>
      <div className='bg-theme clip-path bg-them-h'></div>
      <div className='hero-img-container nike-container'>
        <div className='hero-img-subcont mt-28 md:mt-24'>
          <h1 className="h1-text-top text-center  ">{title}</h1>
          <h1 className="h1-text-top md:mt-4 sm:mt-1 xsm:mt-0 ">{subtitle}</h1>
          <button type='button' className='button-theme button-top2a'><a href="#sales">

            {btntext}
          </a>
          </button>
          <div className='video-clip-div top-[35vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto xsm:hidden sm:flex sm:top-[20vh] sm:items-center sm:justify-between sm:left-[10vh]'>
            {videos?.map((val, i) => (<Clips
              key={i}
              imgsrc={val.imgsrc}
              clip={val.clip}
            />))}
          </div>
          <div className='social-link-icon-div ls:top-[27vh] right-0 gap-3 xsm:top-[20vh]'>
            {sociallinks?.map((val, i) => (<SocialLink
              key={i}
              icon={val.icon}
            />))}
          </div>
        </div>
        <div className=''>
          <img src={img}
            alt='hero-img'
            className='hero-img transitions-theme-hero'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
