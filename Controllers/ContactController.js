const asyncHandler = require("express-async-handler");
const Contact = require("../Modal/contactModal");
const getContact = async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
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
  if (contact?.user_id?.toString() !== req?.user?.id) {
    return res.status(403).json({
      message: "You don't have the permission to update it",
      status: false,
    });
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
    user_id: req?.user?.id,
  });
  res
    .status(201)
    // .json({ massage: "Added the contact", status: true, data: [] });
    .json(constact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ massage: "Contact not found", status: false });

    throw new Error("Contact not found");
  }
  if (contact?.user_id?.toString() !== req?.user?.id) {
    return res.status(403).json({
      message: "You don't have the permission to update it",
      status: false,
    });
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    massage: `Edited the contacts ${req?.params?.id}`,
    status: true,
    data: updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ massage: "Contact not found", status: false });

    throw new Error("Contact not found");
  }
  if (contact?.user_id?.toString() !== req?.user?.id) {
    return res.status(403).json({
      message: "You don't have the permission to update it",
      status: false,
    });
  }
  await Contact.findByIdAndDelete(req.params.id);
  // or
  // await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({
    massage: `deleted the contacts ${req?.params?.id}`,
    status: true,
    data: contact,
  });
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
