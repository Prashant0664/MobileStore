import heroimg from "../assets/hero.png";


import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import youtube from "../assets/youtube.svg";
import messenger from "../assets/messenger.svg";
import axios from "axios";

var colors = [
  "from-blue-600 to-blue-500",
  "from-red-500 to-rose-500",
  "from-violet-500 to-indigo-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-gray-900 to-yellow-500",
  "from-blue-500 to-cyan-500",
  "from-yellow-500 to-yellow-500",
  "from-[#936550] to-orange-900",
  "from-indigo-700 to-indigo-700",
  "from-green-600 to-lime-500",
  "from-slate-900 to-black",
  "from-blue-900 to-blue-500"
]
var shadows = [
  "shadow-lg shadow-blue-500",
  "shadow-lg shadow-rose-500",
  "shadow-lg shadow-violet-500",
  "shadow-lg shadow-green-500",
  "shadow-lg shadow-orange-500",
  "shadow-lg shadow-yellow-500",
  "shadow-lg shadow-cyan-500",
  "shadow-lg shadow-yellow-500",
  "shadow-lg shadow-orange-800",
  "shadow-lg shadow-indigo-500",
  "shadow-lg shadow-lime-500",
  "shadow-lg shadow-black",
  "shadow-lg shadow-blue-500"
]
const Getdata = async () => {
  var items = []
  var popularsales = {}
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/sales`
    );
    for (var i = 0; i < data.data.length; i++) {
      var jsnfile = data.data[i].jsonfile;
      jsnfile = JSON.parse(jsnfile);
      var title = data.data[i].title;
      var price = data.data[i].price;
      var text = data.data[i].type;
      var id = data.data[i]._id;
      var img = data.data[i].image1;
      var img2 = data.data[i].image2;
      var rating = 4.9;
      var btn = "Explore";
      var color = colors[i % (colors.length)];
      var shadow = shadows[i % (shadows.length)];
      var item = {
        id,
        title,
        text,
        rating,
        btn,
        img,
        img2,
        price,
        color,
        shadow
      }
      items.push(item);
    }
    popularsales = {
      title: "Popular Sales",
      items: items
    }
    return popularsales;
  } catch (error) {
  }
}
const GetdatatopSales = async () => {
  var items = []
  var popularsales = {}
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/topratedsales`
    );
    for (var i = 0; i < data.data.length; i++) {
      var jsnfile = data.data[i].jsonfile;
      jsnfile = JSON.parse(jsnfile);
      var title = data.data[i].title;
      var price = data.data[i].price;
      var text = data.data[i].type;
      var id = data.data[i]._id;
      var img = data.data[i].image1;
      var rating = 4.5;
      var btn = "Details";
      var color = colors[(i + 3) % (colors.length)];
      var shadow = shadows[(i + 3) % (shadows.length)];
      var item = {
        id,
        title,
        text,
        rating,
        btn,
        img,
        price,
        color,
        shadow
      }
      items.push(item);
    }
    popularsales = {
      title: "Popular Sales",
      items: items
    }
    return popularsales;
  } catch (error) {
  }
}


const Heroapi = async () => {
  var videos = [];
  try {
    const clips = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/clips`
    );
    for (let i = 0; i < clips.data.data.length; i++) {
      videos.push({ imgsrc: clips.data.data[i].image, clip: clips.data.data[i].clip });
    }
  } catch (error) {
  }
  const hero = {
    title: "Purchase Mobile Phones Now!",
    subtitle: "10k+ Models Available!!",
    img: heroimg,
    btntext: "Explore Product",
    videos: videos,
    sociallinks: [
      { icon: facebook },
      { icon: messenger },
      { icon: instagram },
      { icon: twitter },
      { icon: youtube },
    ],
  };
  return hero;
}
const Highlight = async () => {
  try {
    const clips = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/highlights`
    );

    const highlight = {
      heading: "HIGHLIGHTS",
      title: clips.data[0].title,
      text: "Our Purpose is to move the world forward. We take action by building community, protecting our planet and increasing access to technology.",
      btn: "Explore More",
      url: clips.data[0]._id,
      img1: clips.data[0].image1,
      img2: clips.data[0].image2,
    };
    return highlight;
  } catch (error) {
    console.log(error);
  }
}


const Storiesdata = async () => {
  var storiesf = [];
  try {
    const stories = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/stories`
    );
    for (let i = 1; i < stories.data.length; i++) {
      var data = JSON.parse(stories.data[i].jsonfile);
      var images = data.data[0].details[1].value;
      var text = "";
      for (var k = 2; k < data.data.length; k++) {
        var m = data.data[k];
        for (let h = 0; h < m.details.length; h++) {
          text += m.details[h].name;
          text += ":";
          text += m.details[h].value;
          text += ", ";
        }
      }
      var ctime = new Date();
      var ptime = new Date("December 20, 2023 01:15:00");
      var file = {
        title: stories.data[i].title,
        url: stories.data[i]._id,
        like: "4/5",
        time: `${Math.round((ctime - ptime) / (1000 * 60 * 60 * 24))} days`,
        by: "Android",
        btn: "Know More",
        img: images,
        text: text,
      }
      storiesf.push(file)
    }

    var res = {
      title: "Top Stories",
      news: storiesf
    }
    return res;
  } catch (error) {
  }
}
export { Getdata, GetdatatopSales, Heroapi, Highlight, Storiesdata }