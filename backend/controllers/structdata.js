const clips = require('../models/clips');
const mobiledata = require('../models/Mobiledata');
exports.clips = async (req, res) => {
    try {
        const data = await clips.find();
        var currentdate = new Date(); 
        var datetime = "Last Sync clips: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
        return res.status(200).json({data:data});
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}
exports.highlights = async (req, res) => {
    try {
        var currentdate = new Date(); 
        const data = await mobiledata.find({ highlights: true });
        var datetime = "Last Sync highlights: " + currentdate.getDate() + "/"
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

exports.stories=async(req,res)=>{
    try {
        const data = await mobiledata.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}
