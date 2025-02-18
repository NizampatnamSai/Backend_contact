const express = require("express");
const errorHanlder = require("./MiddleWare/errorHandler");
// const { connectDb } = require("./config/dbConnection");
const dotEnv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
connectDb();
app.use(express.json());

app.use("/api/contacts", require("./Routes/ContanctRoute"));
app.use(errorHanlder);

// app.post("/api/contacts", (req, res) => {
//   let name = req?.params?.name;
//   console.log(req?.params, "reqreq");
//   res.send(`Added the contact of ${name}`);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
