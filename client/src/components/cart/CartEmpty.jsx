import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import emptybag from '../../assets/emptybag.png'
const CartEmpty = ({onCartToggle}) => {
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen pz-11 text-center gap-7'>
        <img src={emptybag}
              alt='emptybag/img'
              className={`lg:w-36 w-64 sm:w-28 h-auto object-fill transition-all duration-500 hover:scale-110 active:scale-50`}
        />
        <button type='button' onClick={onCartToggle} className={`transition-all duration-500 button-theme bg-gradient-to-b from-blue-300 to-blue-600 shadow-lg shadow-orange-500 flex ites-center justify-center text-slate-900 py-2 gap-3 text-sm px-5 font-semibold active:scale-110`}>
          <ArrowLeftIcon className=' w-5 h-5 text-slate-100 hover:text-slate-900 transition-all duration-300 active:scale-150'/>
          <span className={`text-slate-100`}> Back To Store</span>
        </button>
      </div>
    </> 
  )
}

export default CartEmpty