import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setAddItemToCart, setOpenCart } from '../../app/CartSlice'
import Auth from './Auth'
import Details from '../Details'
import { addCart } from '../../helpers'
const Item = ({ ifExists, id, color, shadow, title, text, img, img2, btn, rating, price, flag }) => {
    const [isvisiblecarts, setisvisiblecart] = React.useState(localStorage.getItem("detailshow"));
    const [isregister, setregister] = React.useState(localStorage.getItem("id"));
    const [sauth, setsauth] = React.useState(false);
    const dispatch = useDispatch();
    const [showImg, setShowImg] = React.useState(true)
    const [reid, setreid] = React.useState(id);
    const [myid, setmyid] = React.useState(id);

    const onAddToCart = async () => {
        var price = 399
        setregister(localStorage.getItem("id"))
        if (isregister) {
            console.log("id", id)
            const item = { id, title, text, img, color, shadow, price }
            dispatch(setAddItemToCart(item))
            try {
                const data = await addCart(localStorage.getItem("id"), id);
            }
            catch (err) {
                console.log(err)
            }

        }
        else {
            setsauth(true);
        }
    }



    return (
        <>
            <Details rid={reid} id={localStorage.getItem("myids")} handleshowcart={setisvisiblecart} isvisiblecart={isvisiblecarts} color={color} shadow={shadow} title={title} text={text} img={img} img2={img2} btn={btn} rating={rating} price={price} />
            <Auth show={sauth} setsauth={setsauth} />

            <div className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center ${ifExists ? 'justify-items-start ' : 'justify-items-center'} px-5 py-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}>
                <div className={`grid items-center ${ifExists ? 'justify-items-start' : 'justify-center'}`}>

                    <h1 className=' text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow'>{title}</h1>
                    <p className='text-slate-200 filter drop-shadow text-base md:text-sm font-normal'>{text}</p>

                    <div className='flex items-center justify-between w-28 my-2 '>
                        <div className='flex items-center bg-white/80 px-1 rounded'><h1 className='text-black text-sm blur-effect-theme font-medium'>{price}</h1></div>
                        <div className='flex items-center gap-1'><StarIcon className='icon-style font-medium w-5 h-5 md:w-4' /><h1 className='text-sm md:text-sm font-normal text-slate-100'>{rating}</h1></div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button type='button' className=' z-[100000] bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200' onClick={onAddToCart}><ShoppingBagIcon className='icon-style text-slate-900' /></button>
                        <button type='button' className='z-[100000] bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black' onClick={() => { setisvisiblecart(true); localStorage.setItem("detailshow", true); localStorage.setItem("myids", id); window.location.reload() }}>{btn}</button>
                    </div>

                </div>

                {!flag ? <div className={`${ifExists ? 'absolute top-5 right-1 ' : 'justify-center'} flex items-center`}>
                    <img src={img} onMouseOver={() => setShowImg(false)} alt={`transition-theme-sales-ini img/item-img/${id}`} className={` h-36 ${!showImg ? "transition-theme-sales" : ""} ${ifExists ? ' lg:h-26 md:h-28 xsm:h-16 ' : 'h-36'} `} />

                    {!showImg ? <img src={img2} onMouseLeave={() => setShowImg(true)} alt={`img/item-img/${id}2`} className={`h-36 ${!showImg ? "transition-theme-sales2" : "opacity-0"} ${ifExists ? ' lg:h-26 md:h-28 xsm:h-16 ' : 'h-36'} `} /> : <></>
                    }
                </div> : <>
                    <div className={`${ifExists ? 'absolute top-5 right-1 ' : 'justify-center'} flex items-center`}>
                        <img src={img} onMouseOver={() => setShowImg(false)} alt={`img/item-img/${id}`} className={` transition-theme-toprated-ini  h-36 ${!showImg ? "" : ""} ${ifExists ? ' lg:h-26 md:h-28 xsm:h-16 ' : 'h-36'}`} />
                    </div>
                </>}

            </div>

        </>
    )
}

export default Item