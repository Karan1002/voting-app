const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userLogIn,
  userProfile,
  userProfileUpdate,
} = require("../controller/userController");
const { jwtAuthMiddleware } = require("../middleware/auth");

router.post("/signup", userSignUp);
router.post("/login", userLogIn);
router.get("/profile", jwtAuthMiddleware, userProfile);
router.put("/profile/password", jwtAuthMiddleware, userProfileUpdate);

module.exports = router;
