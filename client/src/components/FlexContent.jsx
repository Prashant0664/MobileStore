import React from 'react'
import Carousel from 'react-material-ui-carousel'
const Example = () => {
  return (
    <></>
  )
}
const FlexContent = ({ ifExists, endpoint: { title, heading, btn, img1, img2, url, text } }) => {
  return (
    <>
      <div className={`flex items-center justify-between lg:flex-col lg:justify-center nike-container ${ifExists ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className='max-w-lg mg:max-w-none w-full md:text-center grid items-center lg:justify-items-center'>
          <h1 className='text-4xl sm:text-3xl font-bold text-gradient'>{heading}</h1>
          <h1 className='text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg'>{title}</h1>
          <p className='xl:text-sm my-4 text-slate-900'>{text}</p>
          <a href={url} className='flex items-center' target={'_blank'} role='button'><button type='button' className='bg-slate-900 shadow-slit-900 text-slate-100 py-1.5 button-theme'>{btn}</button></a>
        </div>
        <div className='flex flex-col justify-center max-w-xl relative lg:max-w-none w-full'>
          <div className=' flex flex-col items-center'>
            <div className=' w-[50%]'>
              <Example />
              <Carousel>
                <img src={img1} />
                <img src={img2} />
              </Carousel>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default FlexContent