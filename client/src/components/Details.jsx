import React from 'react'
import "./swipercss.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from 'react-redux'
import { setAddItemToCart, setOpenCart } from '../app/CartSlice'
import { addCart } from '../helpers/index.js';
import '@splidejs/react-splide/css';

import { footerAPI } from '../data/data.js'
import { fetchphone } from '../helpers/index.js';
import Footer from './Footer';
const splideOptions = {
    perPage: 4,
    perMove: 1,
    type: 'loop',
    rewind: true,
    keyboard: 'global',
    gap: '1rem',
    pagination: false,
    padding: '2rem',
    breakpoints: {
        1200: { perPage: 3 },
        991: { perPage: 2.3 },
        768: { perPage: 2 },
        500: { perPage: 1.3 },
        425: { perPage: 1 },
    },
};
const Details = ({ rid, id, handleshowcart, isvisiblecart, color, shadow, title, text, img, img2, btn, rating, price, }) => {

    const dispatch = useDispatch();
    const [jsonfile, setjsonfile] = React.useState([])
    const [isvisiblecarts, setisvisiblecart] = React.useState(localStorage.getItem("detailshow"))
    const [isregister, setregister] = React.useState(localStorage.getItem("id"));
    const [sauth, setsauth] = React.useState(false);
    const [sid, setsid] = React.useState();
    const [imagesl, setimagesl] = React.useState([]);
    const fetchdata = async (id) => {
        try {
            var { data } = await fetchphone(id);
            if (data && data.msg && data.msg === "error") {
                return;
            }
            setsid(data.id)
            data = data.data
            var jsonfile = data.data
            setjsonfile(jsonfile)
            var iii = []
            for (let i = 0; i < jsonfile[0].details[2].value.length; i++) {
                iii.push(jsonfile[0].details[2].value[i].value);
            }
            setimagesl(iii)
            return data;
        } catch (error) {
            return error
        }
    }
    React.useEffect(() => {
        if (isvisiblecarts === "true" && `${isvisiblecart}` === "true") { fetchdata(id); }
    }, []);

    const Tabelstruct = ({ props, index }) => {
        if (index === 0) return (<></>)
        return (
            <>
                <h2 className='text-lg text-semibold'>
                    {props.category}
                </h2>
                <table className='border border-black w-full'>
                <tbody>

                    {props.details.map((item, i) => {
                        return (<>
                            <tr className='mt-2 '>
                                <td className='md:text-[12px] px-2 border border-black text-[15px]'>{item.name}</td>
                                <td className='md:text-[12px] border border-black px-2 text-[15px]'>{item.value}</td>
                            </tr>
                        </>)
                    })}
                </tbody>
                </table>
            </>
        )
    }
    const onAddToCart = async () => {
        var price = 399
        setregister(localStorage.getItem("id"))
        if (isregister) {
            const item = { sid, title, text, img, color, shadow, price }
            dispatch(setAddItemToCart(item))

            try {
                const data = await addCart(localStorage.getItem("id"), sid);
            }
            catch (err) {
            }
        }
        else {
            setsauth(true);
        }
        // setTimeout(function(){alert("Ginktage.com")},10000);
    }
    const props = { width: 400, height: 250, zoomWidth: 500, img: "1.jpg" };
    return (
        <>
            <div className={`block bg-white  w-[94%] h-[90vh] my-[5vh] border shadow-2xl mx-[3%] top-0 fixed z-[1000000] overflow-y-scroll ${(`${isvisiblecart}` === "true" && isvisiblecarts === "true") ? "" : "hidden"}`}>
                <div className=' rotate-[45deg] float-right mr-[3px] mt-[3px] rounded-full bg-white cursor-pointer hover:rotate-[135deg] hover:scale-110 transition-[200ms]' onClick={() => { setisvisiblecart(false); handleshowcart(false); localStorage.setItem("detailshow", false); window.location.reload() }}>
                    <PlusCircleIcon className='h-[40px]' onClick={() => { setisvisiblecart(false); handleshowcart(false); localStorage.setItem("detailshow", false); }} />
                </div>

                <Carousel className="mccc">

                    {/* <Splide options={splideOptions}> */}
                    {/* <SplideSlide key={i}> */}
                    {jsonfile.length > 0 && jsonfile[0].details[2].value.map((item, i) => (

                        <div className='imgc-cont'>
                            <img src={item} className='carousal-img-css w-auto' />
                        </div>

                    ))}
                    {/* </SplideSlide> */}
                    {/* </Splide> */}
                    {/* <div className='imgc-cont'>
                        <img src="https://res.cloudinary.com/dp9bj8n5p/image/upload/v1703147578/mobilephonewebsite5768/kncim8zz4bptanbtvbbe.png" className='carousal-img-css w-auto' />
                    </div>
                    <div className='imgc-cont'>
                        <img src="https://res.cloudinary.com/dp9bj8n5p/image/upload/v1703149658/mobilephonewebsite5768/bcynxh4cfczimp4ztv7p.png"
                            className='carousal-img-css w-auto' />
                    </div> */}
                </Carousel> .
                <div className='flex flex-col m-2'>
                    <div className='flex flex-row justify-between content-between'>
                        <div className='name text-4xl md:text-lg font-bold'>
                            {jsonfile.length != 0 ? jsonfile[0].details[0].value : ""}
                        </div>
                        <div className='price text-4xl md:text-xl font-bold text-blue-500'>
                            $399
                        </div>
                    </div>
                </div>
                <div className='text:lg m-2 text-semibold text-slate-500'>
                    Delivery by: 2 Jan 2024
                </div>
                <div className='my-4'>

                    {isvisiblecarts === "true" && jsonfile.length != 0 && jsonfile.map((item, i) => {
                        return (<>
                            <Tabelstruct props={item} index={i} />
                        </>)
                    })}
                </div>
                <div className='m-8'>
                    <div onClick={() => onAddToCart()} className=' cursor-pointer text-center text-blue-800 font-bold border p-4 rounded-lg border-blue-500 bg-blue-100 hover:shadow-xl hover:scale-105'>
                        {isregister ? "Add To Cart" : "Sign in to Add to Cart"}
                    </div>
                </div>
                <div className='m-4 cursor-pointer text-center'>
                    <a href="">
                        Terms and Conditions
                    </a>
                </div>
                <div className=''>
                    <Footer footerAPI={footerAPI} />
                </div>
            </div>
        </>
    )
}

export default Details