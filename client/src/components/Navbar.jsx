import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { selectTotalQuantity } from '../app/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenCart } from '../app/CartSlice.js'
import React from 'react'
import logo from '../assets/logo.png'
import Profile from "./Profile.jsx"
import Auth from './utils/Auth.jsx'



const Navbar = () => {
    const totalQ = useSelector(selectTotalQuantity)
    const [navstate, setnavstate] = React.useState(false);
    const [sauth, setsauth] = React.useState(false);
    const dispatch = useDispatch();  //redux tool kit
    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }))
    }
    const [isregister, setregister] = React.useState(localStorage.getItem("id"));
    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setnavstate(true);
        }
        else {
            setnavstate(false);
        }
    }
    React.useEffect(() => {
        window.addEventListener('scroll', onNavScroll)
        return () => {
            window.removeEventListener('scroll', onNavScroll)
        }
    }, [])
    const [clr, handle] = React.useState(false);
    const handles = () => {
        setregister(localStorage.getItem("id"))
        if (isregister) {
            handle(!clr)
            localStorage.setItem("pshow", true)
        }
        else {
            setsauth(true);
        }

    }
    return (
        <>

            <Profile show={clr} handle={handle} />
            <Auth show={sauth} setsauth={setsauth} />
            <header className={!navstate ? 'absolute top-2 left-0 right-0 opacity-100 z-50' : 'fixed top-0 left-0 right-0 flex items-center opacity-100 z-[100] blur-effect-theme h-[9vh] '}>
                <nav className='flex items-center justify-between nike-container'>
                    <div className='flex items-center'>
                        <img src={logo}
                            alt="logo/img"
                            className={`w-24 ${navstate && 'filter brightness-0  transition-all duration-500 '}`} />
                    </div>
                    <ul className='flex items-center justify-center gap-2'>
                        <li className='items-center border-none outline-none active:scale-110 transition-all duration-400 relative '>
                            <MagnifyingGlassIcon className={`icon-style ${!navstate && 'text-white transition-all duration-500 hover:scale-125'}`} />
                        </li>
                        <li className='items-center border-collapse outline-none active:scale-110 transition-all duration-400 relative'>
                            <button type='button' onClick={onCartToggle} className=''>
                                <ShoppingBagIcon className={`icon-style ${!navstate && 'text-white  transition-all duration-500 '}`} />
                                <div className={`absolute top-4 right-0 bg-white text-slate-900 shadow-slate-100 w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full justify-center items-center flex cursor-pointer transition-all duration-500 hover:scale-125 `}>
                                    {totalQ}
                                </div>
                            </button>
                        </li>
                        <li className='items-center border-collapse outline-none active:scale-110 transition-all duration-400 relative'>
                            <UserCircleIcon className={`icon-style ${!navstate && 'text-white'}  ${!navstate && ' transition-all duration-500 '} `} onClick={handles} />
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar