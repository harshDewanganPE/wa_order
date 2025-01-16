const axios = require("axios");
const { Text } = require("./text.controller");
require("dotenv").config();

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

const Start = async (phon_no_id, from, msg_body, req, res) => {

  if (msg_body == "hi" || msg_body == "Hi") {
    axios({
      method: "POST",
      url:
        "https://graph.facebook.com/v13.0/" +
        phon_no_id +
        "/messages?access_token=" +
        token,
      data: {
        messaging_product: "whatsapp",
        to: from,
        recipient_type: "individual",

        type: "interactive",

        interactive: {
          type: "button",
          header: {
            type: "image",
            image: {
              link: "https://assets.pharmeasy.in/web-assets/about_us/mainCarousel_01.jpg?dim=640x640&q=75",
            },
          },
          body: {
            text: "Hi, Welcome to PharmEasy. Please help us with your delivery pincode to proceed and place your order.",
          },
          footer: {
            text: "Please provide your pincode number to check availability.",
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: "change-button",
                  title: "Enter Pincode",
                },
              },
            ],
          },
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.sendStatus(200);
  } else {
    
    const body = {
        msg: 'Thanks to reaching us Please type "Hi" to begin a new chat'
    }
    Text(phon_no_id, from, body, req, res);

  }

};

module.exports = { Start };
