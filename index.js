const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express().use(body_parser.json());

const Start = require("./controllers/start.controller.js");

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN; //prasath_token

app.listen(8000 || process.env.PORT, () => {
  console.log("webhook is listening");
});

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
});

app.use("/webhook", require("./routes/start.routes.js")); 


app.get("/", (req, res) => {
  res.status(200).send("hello this is webhook setup");
});
