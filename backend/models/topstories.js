const { mongoose, model } = require("mongoose");

const { ObjectId } = mongoose.Schema;

const mobiledata = new mongoose.Schema(
    {
        image:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        link:{
            type:String,
            required:true
        },
        user: {
            type: String,
            required: true,
        },
        },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Mobiledata", mobiledata);
