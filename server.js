const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const candidateRoute = require("./routes/candidateRoute");
const mongoDBConnect = require("./config/mongoDB");


app.use("/user", userRoutes);
app.use("/candidate", candidateRoute);

app.listen(PORT, async () => {
  try {
    await mongoDBConnect(process.env.MONGO_URI);
    console.log("listening on port 3000");
  } catch (error) {
    console.log("interval server error");
  }
});
