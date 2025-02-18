let Emptyobject = {};
const asyncHandler = require("express-async-handler");
const Contact = require("../Modal/contactModal");
const getContact = async (req, res) => {
  const contacts = await Contact.find();
  res
    .status(200)
    // .json({ massage: "Get all the contacts", status: true, data: [] });
    .json(contacts);
};

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ massage: "Contact not found", status: false });

    throw new Error("Contact not found");
  }
  res.status(200).json({
    massage: `Contact received `,
    status: true,
    data: contact,
  });
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req?.body, "reqreq");
  //   Emptyobject = req?.body;
  let { name, email, phone } = req?.body;
  //   if (!name || !age) {
  //     // return res
  //     //   .status(400)
  //     //   .json({ massage: "Please fill all the fields", status: false, data: [] });
  //     res.status(400);
  //     throw new Error("Please fill all the fields");
  //   }
  // if (!name || !age || !phone) {
  //   return res.status(400).json({
  //     message: "Please fill all the fieldsss",
  //     status: false,
  //     data: [],
  //   });
  // }
  if (!name) {
    return res.status(400).json({
      message: "Name is mandetory",
      status: false,
      data: [],
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is mandetory",
      status: false,
      data: [],
    });
  }
  if (!phone) {
    return res.status(400).json({
      message: "Phone Number is mandetory",
      status: false,
      data: [],
    });
  }
  const constact = await Contact.create({
    name,
    email,
    phone,
  });
  res
    .status(201)
    // .json({ massage: "Added the contact", status: true, data: [] });
    .json(constact);
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    massage: `Edited the contacts ${req?.params?.id}`,
    status: true,
    data: [],
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    massage: `deleted the contacts ${req?.params?.id}`,
    status: true,
    data: [],
  });
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
