const express = require("express");

const {
  register,
  addcart,
  clearcart,
  removeitem,
  sendcart,
  decreaseitem,
  editdetailsuser,
  login,
  getUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  sendreportmails,
  fetchprof,
} = require("../controllers/user");
const {
  sendmail,
  checkifverify,
  verifycode,
  checkotpv
} = require("../controllers/verifyemail")
const router = express.Router();
router.post("/register", register);
router.post("/checkotpv", checkotpv);

router.post("/checkifverify", checkifverify);
router.post("/login", login);
router.post("/sendmail", sendmail);
router.post("/verifycode", verifycode);
router.get("/getUser/:userId", getUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.post("/reportcontent", sendreportmails);
router.post("/fetchprof", fetchprof);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: " Authentication hasbeen failded ! ",
  });
});

router.get("/login/success", async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: { id: req.user._id, name: req.user.name, email: req.user.email, googleId: req.user.googleId, picture: req.user.picture }
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Un-successfull",
      user: null,
    });
  }
});
//Logout
router.get("/logout", async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(400).json("Couldn't logout");
      }
    });
    res.cookie('session', '', { expires: new Date(0), });
    res.clearCookie("sessionId");
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.post("/addcart", addcart);
router.post("/clearcart", clearcart);
router.post("/removeitem", removeitem);
router.post("/decreaseitem", decreaseitem);
router.post("/editdetailsuser", editdetailsuser);
router.post("/sendcart", sendcart);


module.exports = router;
