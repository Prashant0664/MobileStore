import { ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

const CartCount = ({onCartToggle, onClearCart, totalQ}) => {
  return (
    <div className={` bg-white items-center justify-between flex h-11 px-3 sticky top-0 w-full left-0 right-0 `}>
        <div className={` flex items-center gap-3 `}>
            <div onClick={onCartToggle} className={` grid items-center cursor-pointer`}>
                <ChevronDoubleLeftIcon className={` w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2] `}/>
            </div>
            <div className={` grid items-center`}>
                <h1 className=' text-base font-medium text-slate-900'>Your Cart<span className='bg-theme-cart  rounded px-1 py-0.5 text-slate-100 font-normal'>{totalQ}</span></h1>
            </div>
        </div>
        <div className={` flex items-center `}>
            <button type='button' onClick={onClearCart} className={' rounded bg-theme-cart active:scale-90 padding-0.5 '}>
                <XMarkIcon  className='w-5 h-5 text-white stroke-[2] hover:text-black hover:bg-white'/>
            </button>
        </div>
    </div>
  )
}

export default CartCount