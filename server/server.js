const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv/config");

const userRouter = require("./Router/userRouter");
const postRouter = require("./Router/postRouter");
const initiativeRouter = require("./Router/initiativeRouter");
const ecoActionRouter = require("./Router/ecoActionRouter");
const challengeRouter = require("./Router/challengeRouter");
const resourceRouter = require("./Router/resourceRouter");

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/initiatives", initiativeRouter);
app.use("/api/eco-actions", ecoActionRouter);
app.use("/api/challenges", challengeRouter);
app.use("/api/resources", resourceRouter);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Ecofriends</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
