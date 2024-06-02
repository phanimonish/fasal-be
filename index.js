require("dotenv").config();
require("./src/db").connect();

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});
