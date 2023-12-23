import React from 'react'
import { PlayIcon } from "@heroicons/react/24/solid";

const Clips = ({ clip, imgsrc }) => {
  return (
    <div className='clipclassbox h-28 w-32 group transition-opacity lg:w-28 md:w-24 sm:w-16 lg:h-24 md:h-20 sm:h-14'>
      <img src={imgsrc}
        alt="img/clips"
        className='clipclass' />
      <div className='icon-triangle-box ng-white blur-effect-theme  w-8 h-8 md:w-5 md:h-5 z-[100] lg:top-8 lg:left-9 sm:top-4 sm:left-5 '>
        <PlayIcon className="icon-style text-slate-100 md:w-3 md:h-3" />
      </div>
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        className='clipvideos group-hover:opacity-100 group-hover:z-50'
      >
        <source type='video/mp4' src={clip} />
      </video>
    </div>
  )
}

export default Clips