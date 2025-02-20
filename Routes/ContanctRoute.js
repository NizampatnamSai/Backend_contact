const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require("../Controllers/ContactController");
const validateToken = require("../MiddleWare/validateTokenHandler");

//normal get method
// router.route("/").get(getContact);

//normal get by id method

// router.route("/:id").get((req, res) => {
//   res.status(200).json({
//     massage: `Contact received of ${req?.params?.id}`,
//     status: true,
//     data: [],
//   });
// });

// router.route("/:id").get(getContactById);

//normal post method

// router.route("/").post((req, res) => {
//   res
//     .status(200)
//     .json({ massage: "Added the contact", status: true, data: [] });
// });
// router.route("/").post(createContact);

//normal delete method

// router.route("/:id").delete((req, res) => {
//   res.status(200).json({
//     massage: `deleted the contacts ${req?.params?.id}`,
//     status: true,
//     data: [],
//   });
// });
// router.route("/:id").delete(deleteContact);

//normal put method

// router.route("/:id").put((req, res) => {
//   res.status(200).json({
//     massage: `Edited the contacts ${req?.params?.id}`,
//     status: true,
//     data: [],
//   });
// });

// router.route("/:id").put(updateContact);

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router
  .route("/:id")
  .put(updateContact)
  .delete(deleteContact)
  .get(getContactById);

module.exports = router;
