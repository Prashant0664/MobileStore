const { mongoose, model } = require("mongoose");

const { ObjectId } = mongoose.Schema;

const mobiledata = new mongoose.Schema(
    {
        jsonfile: {
            type: String,
            required: true,
        },
        popularsales: {
            type: Boolean,
            required: true,
            default: false,
        },
        highlights: {
            type: Boolean,
            required: true,
            default: false,
        },
        featured: {
            type: Boolean,
            required: true,
            default: false,
        },
        tagline:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:false,
            default:""
        },
        title:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        image1:{
            type:String,
            required:true,
        },
        image2:{
            type:String,
            required:true,
        },
        color:{
            type:String,
            required:true
        },
        shadow:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Mobiledata", mobiledata);
