const { validateEmail, validateLength } = require("../helper/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/token");
const Code = require('../models/Code');
const { sendResetCode } = require("../helper/mail");
const { sendReportMail } = require("../helper/reportmail");
const generateCode = require("../helper/gen_code");

exports.addcart = async (req, res) => {
  try {
    const { id1,id2 } = req.body;
    const data=await User.findById(id1);
    var arr=data.carts
    var f=0;
    var values=1;
    for(let i=0;i<arr.length;i++){
      if(arr[i].name===id2){
        values=values+eval(arr[i].value);
        arr.splice(i, 1)
        
        f=1;
        break;
      }
    }
      arr.push({
        name:id2,value:values})
    data.carts=arr
    data.save();
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.removeitem = async (req, res) => {
  try {
    const { id1,id2 } = req.body;
    // console.log(id1);
    const data=await User.findById(id1);
    var arr=data.carts
    var f=0;
    var values=1;
    for(let i=0;i<arr.length;i++){
      if(arr[i].name===id2){
        values=values+eval(arr[i].value);
        arr.splice(i, 1)
        f=1;
        // console.log("prsghhbnk")
        break;
      }
    }
    data.carts=arr
    data.save();
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error,"errrrror")
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.decreaseitem = async (req, res) => {
  try {
    const { id1,id2 } = req.body;
    // console.log(id1);
    const data=await User.findById(id1);
    var arr=data.carts
    var f=0;
    var values=0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].name===id2){
        values=values+eval(arr[i].value);
        arr.splice(i, 1)
        f=1;
        console.log("prsghhbnk")
        break;
      }
    }
    if(values===0){
      return res.status(200).json({ msg: "ok" });
    }
    values=values-1;

    arr.push({
      name:id2,value:values})
    data.carts=arr
    data.save();
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.clearcart = async (req, res) => {
  try{
    const {id1}=req.body;
    const data=await User.findById(id1);
    data.carts=[];
    data.save();
  }
  catch(err){
    console.log(err);
  }
}
exports.editdetailsuser=async(req,res)=>{
  try {
    const {id,phone,address}=req.body;
    const data=await User.findById(id);
    // console.log(id,phone,address)
    data.phone=phone;
    data.address=address;
    data.save();
    console.log("saved")
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.sendcart=async(req,res)=>{
  try {
    const {id}=req.body;
    const data=await User.findById(id);
    var resp=data.carts
    return res.status(200).json({ msg: "ok",data:resp });
  } catch (error) {
    
    console.log(error)
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.sendreportmails = async (req, res) => {
  try {
    const {
      pid,
      postid,
      userid,
      name1,
      name2,
      reason
    } = req.body;
    const reporter = await User.findById(userid);
    // console.log(reporter);
    const reported = await User.findById(postid);
    var emailr = reporter.email
    var emailrd = reported.email
    var namer = reporter.name
    var namerd = reported.name
    try {
      // console.log(emailr,emailrd,namer,namerd,reason,pid);
      sendReportMail(emailr, emailrd, namer, namerd, reason, pid);
    } catch (error) {
      console.log("error in sending mails")
    }
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Bad Request" })
  }
}
exports.register = async (req, res) => {
  try {
    const { name, temail, password, phone, address } = req.body;
    if (!validateLength(name, 6, 15)) {
      return res
      .status(400)
      .json({ message: "Enter name between 6 to 15 characters !" });
    }
    if (!validateEmail(temail)) {
      return res.status(400).json({ message: "Please enter a valid email !" });
    }
    
    if (!validateLength(password, 6, 15)) {
      return res
      .status(400)
      .json({ message: "Enter password between 6 to 15 characters !" });
    }
    
    const check = await User.findOne({ temail });
    if (check) {
      return res.status(400).json({
        message:
        "This email already exists,try again with a different email",
      });
    }
    
    const hashed_password = await bcrypt.hash(password, 10);
    const user = await new User({
      name:name,
      email:temail,
      password: hashed_password,
      phone:phone,
      address:address,
      verify: true
    }).save();
    const token = generateToken({ id: user._id.toString() }, "15d");
    return res.send({
      id: user._id,
      name: user.name,
      picture: user.picture,
      token: token,
      message: "Register Success !",
    });
  } catch (error) {
    console.log(error,"error in signup controller");
    return res.status(500).json({ message: error.message });
  }
};
exports.fetchprof = async (req, res) => {
  try {
    const { id } = req.body
    // console.log(req.body)
    const data = await User.findById(id);
    // console.log(data);
    const resp = {
      name: data.name,
      picture: data.picture,
      email: data.email,
      phone: data.phone,
      address:data.address,
      _id: id
    }
    return res.status(200).json({ msg: resp })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "error" })
  }
}
exports.login = async (req, res) => {
  try {
    const { temail, password } = req.body;
    const user = await User.findOne({ email:temail });
    if (!user) {
      return res.status(400).json({
        message:
          "the email you entered is not registered.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid Credentials. Please Try Again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "15d");
    res.send({
      id: user._id,
      name: user.name,
      picture: user.picture,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const { password, ...otherdata } = user
    res.status(200).json(otherdata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findOutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email: email })
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ message: "no such user exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.name, code);
    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: "Verification code is wrong!",
      });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cryptedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      {
        password: cryptedPassword,
      }
    );
    return res.status(200).json({ message: "ok" });

  } catch (error) {
    res.status(400).json({ message: "AN ERROR OCCURRED, PLEASE TRY AGAIN LATER" })
  }
};
