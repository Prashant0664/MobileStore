const Mobiledata = require('../models/Mobiledata');

exports.sales = async (req, res) => {
    try {
        var currentdate = new Date();
        const data = await Mobiledata.find({ popularsales: true });
        var datetime = "Last Sync sales: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        // console.log(datetime)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({ msg: error });

    }
}
exports.topratedsales = async (req, res) => {
    try {
        var currentdate = new Date();
        const data = await Mobiledata.find({ featured: true });
        var datetime = "Last Sync toprated: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        // console.log(datetime)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ msg: error });

    }
}
exports.featured = async (req, res) => {
    try {
        const data = await Mobiledata.find({ featured: true });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

exports.fetchphone = async (req, res) => {
    try {
        const { id } = req.body
        const data=await Mobiledata.findById(id);
        const jsonfile=JSON.parse(data.jsonfile);
        return res.status(200).json({data:jsonfile,title:data.title,price:data.price});
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}
exports.fetchphoneonly = async (req, res) => {
    try {
        var { id } = req.body
        // console.log(req.body);
        const data=await Mobiledata.findById(id);
        // console.log(data)
        return res.status(200).json({title:data.title,price:data.price,img:data.image1,id:data._id,color:data.color,shadow:data.shadow});
    } catch (error) {
        console.log("errrrrr",error)
        return res.status(400).json({ msg: error });
    }
}