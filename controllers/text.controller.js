const axios = require("axios");
require("dotenv").config();

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

const Text = async (phon_no_id, from, type_obj, req, res) => {
  const base =
    "https://graph.facebook.com/v13.0/" +
    phon_no_id +
    "/messages?access_token=" +
    token;

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    messaging_product: "whatsapp",
    to: from,
    text: {
      body: type_obj.msg,
    },
  };

  axios
    .post(base, body, header)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  Text,
};
