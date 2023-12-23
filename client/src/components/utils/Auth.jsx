import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import axios from "axios";
import "./auth.css"
import { useDispatch, useSelector } from 'react-redux'
import { setAddItemToCart, setOpenCart } from '../../app/CartSlice'
import { addCart } from "../../helpers/index";
import {
  checkifverify,
  sendmail,
  sendcart,
  checkotpv
} from "../../helpers/index"
import ResetPassword from "./Resetpassword";
function Auth({ show, setsauth }) {
  const [state, setState] = useState("Log In");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [otpv, cotpv] = useState("");
  const [vo, svo] = useState(false);
  const [showresetpass, setshowresetpass] = useState(false);
  const [cs, scs] = useState("");


  const dispatch = useDispatch();  //redux tool kit

  const userInfos = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(userInfos);
  const { email, password, name, phone, address } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    var temail = email.toLowerCase()
    if (state === "Log In") {
      try {
        if (!temail || !password) {
          setError('All feilds are required !')
          return;
        }
        const data = await checkifverify(temail);
        if (data.msg === "ok") {

        }
        else if (
          data.msg === 'ne'
        ) {
          setError("Please Sign Up First ");
          return;
        }
        else {
          setError("Please Sign up and Verify Your Email ");
          return;
        }
      } catch (error) {
      }
      logIn();
    } else {
      if (!name || !temail || !password || !phone || !address) {
        setError('All feilds are required !')
        return;
      }
      if (vo === false) {
        setError('An OTP has been send to your mail for verification')
        const datas = await sendmail(temail, name);
        scs(true);
      }
    }
  };
  const checkotp = async () => {
    try {
      var temail = email.toLowerCase()
      const data = await checkotpv(temail, otpv);
    } catch (error) {
      setError('An Error Occurred')
    }
  }
  const onAddToCart = async (arr) => {
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i].name) {
        continue;
      }
      var itemdata = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/fetchphoneonly`,
        {
          id: arr[i].name
        }
      )
      var itemdata = itemdata.data
      const item = {
        id: itemdata.id,
        title: itemdata.title,
        text: "Android",
        img: itemdata.img,
        color: itemdata.color,
        shadow: itemdata.shadow,
        price: 399
      }
      dispatch(setAddItemToCart(item))
    }
    try {
      const data = await addCart(localStorage.getItem("id"), localStorage.getItem("id"));
    }
    catch (err) {
    }
    // setTimeout(function(){alert("Ginktage.com")},10000);
  }

  const logIn = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/login`,
        {
          temail,
          password,
        }
      );
      setError('')
      setSuccess("Success !")
      // console.log(data)
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
      console.log(localStorage.getItem("id"))
      const iddd = localStorage.getItem("id")
      const cart = await sendcart(iddd);
      const dataf = await onAddToCart(cart.data.data);
      setTimeout(() => {
        setsauth(false);
        window.location.reload()
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const signUp = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/register`,
        {
          name,
          temail,
          password,
          phone,
          address
        }
      );

      setError('')
      setSuccess(data.message)
      const { message, ...rest } = data;
      setTimeout(() => {

      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const verifyOTP = async () => {
    try {
      var temail = email.toLowerCase()
      const data = await checkotpv(temail, otpv);
      if (data.msg === 'ok') {
        setError("OTP Matched");
        signUp();
      }
      else {
        setError("OTP do not match");
      }
    } catch (error) {
      setError("ERROR OCCURRED!");
    }
  }
  const signUpWithGoogle = () => {
    window.open(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/google`, "_self");

  }

  return (
    <>
      <div className={`bg-[rgba(0,0,0,0.6)] fixed h-[100vh] w-full block z-[1000000] p-[200px] ${show ? "" : "hidden"} mt-0 pt-0 top-0`}>
        <div className="auth_wrapper">
          {
            showresetpass ? <ResetPassword /> : <>

              <div className="img">
                {/* <img src="" alt="rfe" /> */}
                <span>{state}</span>
              </div>
              <div className="login-cont">
                <div
                  className="tab"
                  style={{
                    borderBottom: `${state === "Log In" ? "2px solid black" : ""}`,
                    color: `${state === "Log In" ? "black" : ""}`,
                  }}
                  onClick={() => {
                    setState("Log In");
                    setError("")
                  }}
                >
                  Log In
                </div>
                <div
                  className="tab"
                  style={{
                    borderBottom: `${state === "Sign Up" ? "2px solid black" : ""}`,
                    color: `${state === "Sign Up" ? "black" : ""}`,
                  }}
                  onClick={() => {
                    setState("Sign Up");
                    setError("")

                  }}
                >
                  Sign Up
                </div>
              </div>
              {state === "Log In" ? (
                <div>

                </div>
              ) : (
                <div>

                </div>
              )}
              <form action="">
                {state === "Sign Up" ? (
                  <div className="input">
                    <TiUser size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      value={name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="input">
                  <TfiEmail size={14} />
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleRegisterChange}
                  />
                </div>
                {state === "Sign Up" ? <>

                  <div className="input">
                    <TfiEmail size={14} />
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="input">
                    <TfiEmail size={14} />
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      value={address}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </>
                  : <></>}
                <div className="input">
                  <CiLock size={16} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleRegisterChange}
                  />
                </div>
                {(cs) && state === "Sign Up" ?
                  <div className="input">
                    <input
                      type="number"
                      name="OTP"
                      placeholder="OTP"
                      value={otpv}
                      onChange={(e) => { cotpv(e.target.value) }}
                    />
                  </div>
                  : <></>}
              </form>
              {error && <span className="errorValidation" >{error}</span>}
              {success && <span className="RegisterSuccess" >{success}</span>}
              {state === "Sign Up" ? (
                <div className="dilougue">
                  By signing up, you agree to our <b>terms of service</b> and
                  <b>privacy policy</b>. No credit card required.
                </div>
              ) : (
                <div className="forget">
                  <div className="text-10" onClick={() => { setshowresetpass(true) }}>
                    Don't remember your password?
                  </div>
                  {/* <Link to="/resetPassword">Don't remember your password?</Link> */}
                </div>
              )}
              {(cs) && state === "Sign Up" ?
                <div className="footer" onClick={verifyOTP}>
                  {state === "Sign Up" ? "Verify OTP" : "LOG IN"}
                </div>
                :
                <div className="footer" onClick={handleSubmit}>
                  {state === "Sign Up" ? "SIGN UP FOR FREE" : "LOG IN"}
                </div>
              }
            </>
          }
        </div>
      </div>

    </>
  );
}

export default Auth;
