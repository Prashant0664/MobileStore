const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () { return !this.googleId },
    },
    verify:{
      type:Boolean,
      default:false
    },
    googleId: {
      type: String,
      required: function () { return !this.password },
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    about: {
      type: String
    },
    carts:{
      type:Array,
      default:[]
    },
    orders:{
      type:Array,
      default:[]
    },
    phone:{
      type:Number,
      required:true,
    },
    address:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

