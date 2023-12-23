const { mongoose, model } = require("mongoose");

const { ObjectId } = mongoose.Schema;

const clips = new mongoose.Schema(
    {
        image:{
            type:String,
            required:true
        },
        clip:{
            type:String,
            required:true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("clips", clips);
