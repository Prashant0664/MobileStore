import React from 'react'
import { Hero, Sales, FlexContent, Stories, Footer, Navbar, Cart } from './components/index.js';
import { footerAPI } from './data/data.js'
import { useDispatch } from 'react-redux'
import { setClearCartItems } from './app/CartSlice.js';

import { Getdata, GetdatatopSales, Heroapi, Highlight, Storiesdata } from './data/mdata.js';
import Auth from './components/utils/Auth.jsx';
const App = () => {
  const [popularsales, setPopularsales] = React.useState([]);
  const dispatch = useDispatch();  //redux tool kit
  const [toprateslaes, settoprateslaes] = React.useState([]);
  const [heroapi, setheroapi] = React.useState([]);
  const [highlights, sethighlights] = React.useState([]);
  const [story, setstory] = React.useState([]);
  const getdata = async () => {
    const f = await Getdata();
    setPopularsales(f);
    const g = await GetdatatopSales();
    settoprateslaes(g);
    const h = await Heroapi();
    setheroapi(h);
    const i = await Highlight();
    sethighlights(i);
    const j = await Storiesdata();
    setstory(j);
  };
  React.useEffect(() => {
    getdata();
    localStorage.setItem("pshow", false)
    if (localStorage.getItem("id")) {

    }
    else {
      dispatch(setClearCartItems())
    }
  }, []);
  return (
    <>
      <main className='flex flex-col gap-16 relative'>
        <Navbar />
        <Auth />
        <Cart />
        <Hero heroapi={heroapi} />
        {popularsales?<Sales endpoint={popularsales} flag={false} ifExists />:<></>}
        <FlexContent endpoint={highlights} ifExists />
        <Sales endpoint={toprateslaes} flag={true} />
        <FlexContent endpoint={highlights} />
        <Stories story={story} />
      </main>
      <Footer footerAPI={footerAPI} />
    </>
  )
}

export default App