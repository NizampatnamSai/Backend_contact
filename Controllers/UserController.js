const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Modal/userModal");

//private
const getCurrentUser = async (req, res) => {
  res.json({
    status: true,
    message: "current user info the user",
    data: [],
  });
};

const registerUser = asyncHandler(async (req, res) => {
  let { username, email, password } = req?.body;

  if (!username) {
    return res.status(400).json({
      message: "User Name is mandatory",
      status: false,
      data: [],
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is mandatory",
      status: false,
      data: [],
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password is mandatory",
      status: false,
      data: [],
    });
  }

  const isUserAvailable = await User.findOne({ email });
  const users = await User.find();
  console.log(isUserAvailable, users, "usersusers");
  if (isUserAvailable) {
    return res
      .status(400)
      .json({ message: "Email already existed", status: false, data: [] });
  }

  //hass passward

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "hashedPassword");
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    return res.status(201).json({
      _id: user.id,
      email: user.email,
      status: true,
      message: "Successfully registered",
    });
  } else {
    return res
      .status(400)
      .json({ message: "User data is not valid", status: false });
  }

  //net sending as contains hashed password
  //   res
  //     .status(201)
  //     // .json({ massage: "Added the contact", status: true, data: [] });
  //     .json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  let { username, email, password } = req?.body;

  if (!username) {
    return res.status(400).json({
      message: "User Name is mandatory",
      status: false,
      data: [],
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is mandatory",
      status: false,
      data: [],
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password is mandatory",
      status: false,
      data: [],
    });
  }
  const constact = await User.create({
    username,
    email,
    password,
  });
  res
    .status(201)
    // .json({ massage: "Added the contact", status: true, data: [] });
    .json(constact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await User.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ massage: "User not found", status: false });

    throw new Error("User not found");
  }
  const updatedContact = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    massage: `Edited the contacts ${req?.params?.id}`,
    status: true,
    data: updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await User.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ massage: "User not found", status: false });

    throw new Error("User not found");
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    massage: `deleted the contacts ${req?.params?.id}`,
    status: true,
    data: contact,
  });
});

module.exports = {
  getCurrentUser,
  registerUser,
  loginUser,
};
