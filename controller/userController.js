const User = require("../models/userModel");
const { generateToken } = require("../middleware/auth");

const userSignUp = async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");
    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log(`token is:- ${token}`);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const userLogIn = async (req, res) => {
  try {
    const { adharCardNumber, password } = req.body;
    const user = await User.findOne({ adharCardNumber: adharCardNumber });
    if (!user || user.comparePassword(password)) {
      return res.status(401).json({ error: "invaild username or password" });
    }
    const payload = {
      id: response.id,
    };
    const token = generatToken(payload);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userData = req.user;
    const userID = userData.id;
    const user = await User.findById(userID);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const userProfileUpdate = async (req, res) => {
  try {
    const userID = req.user;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById({ userID });
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "invaild username or password" });
    }
    user.password = newPassword;
    await user.save();
    console.log("password updated");
    res.status(200).json({ msg: "password update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = { userSignUp, userLogIn, userProfile, userProfileUpdate };
