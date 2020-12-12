const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/routes/user_route");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/Auth", User);

app.listen(port, process.env.IP, () => console.log("Server has Started"));
