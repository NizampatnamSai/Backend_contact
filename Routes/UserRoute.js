const express = require("express");
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../Controllers/UserController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", getCurrentUser);

module.exports = router;
