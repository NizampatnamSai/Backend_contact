const express = require("express");
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../Controllers/UserController");
const validateToken = require("../MiddleWare/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser);

module.exports = router;
