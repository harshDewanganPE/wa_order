const axios = require("axios");
require("dotenv").config();

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

const Start = (req, res) => {
  let body_param = req.body;

  console.log(JSON.stringify(body_param, null, 2));

  if (body_param.object) {
    console.log("inside body param");
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("boady param " + msg_body);

      const outgoingMessage = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        type: "image",
        image: {
          link: "https://assets.pharmeasy.in/web-assets/about_us/mainCarousel_01.jpg?dim=640x640&q=75",
          caption:
            "Hi, Welcome to PharmEasy. Please help us with your delivery pincode to proceed and place your order.",
        },
      };

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
            type: "image",
            image: {
              link: "https://assets.pharmeasy.in/web-assets/about_us/mainCarousel_01.jpg?dim=640x640&q=75",
              caption:
                "Hi, Welcome to PharmEasy. Please help us with your delivery pincode to proceed and place your order.",
            },
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        res.sendStatus(200);
      } else {
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
            text: {
              body: "Thanks to reaching us Please type \"Hi\" to begin a new chat",
            },
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(404);
    }
  }
};

module.exports = { Start };
