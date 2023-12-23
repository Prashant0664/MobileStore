import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

import { useDispatch } from 'react-redux'
import { setOpenCart } from '../app/CartSlice.js'
import { fetchprof } from '../helpers'
import { editdetailsuser } from '../helpers'
const Profile = ({ show, handle }) => {
    const [pshow, setpshow] = React.useState(localStorage.getItem("pshow"));
    const [details, setdetails] = React.useState("")
    const [edit, setedit] = React.useState(false)
    const [phone, setphone] = React.useState(details ? details.phone : "")
    const [address, setaddress] = React.useState(details ? details.address : "")
    const dispatch = useDispatch();  //redux tool kit
    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }))
    }
    const editdetails = () => {
        setedit(true)
    }
    const saved = async () => {
        if (!phone || phone.length < 9 || !address) {
            window.alert("Fill All fields Correctly");
            return;
        }
        try {
            const data = await editdetailsuser(localStorage.getItem("id"), phone, address);
            var det = details;
            det.phone = phone;
            det.address = address;
            setdetails(det)
            setedit(false)
            alert("Details Changed SuccessFully! :)")
        }
        catch (err) {
            alert("An Error Occurred")
            return;
        }
        setedit(false)
    }
    if (pshow === true) {

    }
    const fetchpro = async () => {
        try {
            const data = await fetchprof(localStorage.getItem("id"));
            setdetails(data.msg);
            return;
        } catch (error) {
        }
    }
    const signout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("cart");
        localStorage.removeItem("detailshow");
        localStorage.removeItem("myids");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("pshow");
    }
    React.useEffect(() => {
        fetchpro()
    }, [])
    return (
        <>
            <div className={`fixed top-0 h-[80vh] mt-[9%] rounded-lg w-[90%] border-black border shadow-lg mx-[5%] block z-[10000000] bg-white text-black ${show ? "" : "hidden"}`}>
                <div className='flex w-full justify-between'>
                    <div className='float-left ml-2 mt-2 cursor-pointer' >
                        <PencilSquareIcon className='h-[30px]' onClick={() => setedit(true)} />
                    </div>
                    <div className=' rotate-[45deg] float-right mr-2 mt-2 cursor-pointer hover:rotate-[135deg] hover:scale-110 transition-[200ms]' onClick={() => { localStorage.setItem("pshow", false); setpshow(false) }}>
                        <PlusCircleIcon className='h-[40px]' onClick={() => { handle(false); localStorage.setItem("pshow", "false"); setpshow(false) }} />
                    </div>
                </div>
                <div className='flex flex-col ml-20 md:ml-8 mt-12 mr-6 '>
                    <div className='flex flex-row md:flex-col md:items-center items-start align-baseline'>
                        <UserCircleIcon className='h-[100px] w-[100px] hover:cursor-pointer' />
                        <div className='ml-6 mt-4 flex md:items-center flex-col'>
                            <div className='text-blue-500 text-2xl md:text-[18px] font-semibold '>
                                {details.name}
                            </div><div className='md:text-[16px]'>
                                {details.email}
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='mt-4 text-xl font-semibold'>
                            Phone Number
                        </div>
                        {!edit ? <div className='text-sm'>
                            {details.phone}
                        </div> : <>
                            <div className='editname'>
                                <form className=''>
                                    <input
                                        value={phone}
                                        type='number'
                                        placeholder="Phone Number"
                                        onChange={e => { setphone(e.target.value) }}
                                        className="user-search-input sm:w-[270px]"
                                    />
                                </form>
                            </div>
                        </>}
                    </div>
                    <div className=''>
                        <div className='mt-4 text-xl font-semibold'>
                            Address
                        </div>
                        {!edit ? <div className='text-sm'>
                            {details.address}
                        </div> : <>
                            <div className='editname'>
                                <form className=''>
                                    <input
                                        value={address}
                                        type='text'
                                        placeholder="Address"
                                        onChange={e => { setaddress(e.target.value) }}
                                        className="user-search-input sm:w-[270px]"
                                    />
                                </form>
                            </div>
                        </>}
                        {edit ? <>
                            <button onClick={() => saved()} type='button' className='rounded-3xl w-[280px] mt-4 hover:scale-110 border border-green-400 bg-green-200 px-4 py-2 text-center text-[15px] '>Submit</button>
                        </> : <></>}
                    </div>
                    <div className='flex gap-2 hover:cursor-pointer items-center w-full justify-around mt-8  '>
                        <div onClick={() => { window.alert("You have not placed any order yet:/") }} className='rounded-3xl hover:scale-110 border border-slate-400 bg-blue-200 px-4 py-2 w-full justify-center text-center text-[15px] '>
                            Orders
                        </div>

                        <div onClick={() => { onCartToggle(); handle(false); localStorage.setItem("pshow", "false"); setpshow(false) }} className='rounded-3xl hover:scale-110 border border-slate-400 bg-blue-200 px-4 py-2 w-full justify-center text-center text-[15px] '>
                            Cart
                        </div>
                        <div onClick={() => { signout(); window.location.reload() }} className='rounded-3xl hover:scale-110 border-red-800 border bg-red-100 px-4 py-2 w-full justify-center text-center text-[15px] '>
                            Signout
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile