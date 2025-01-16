const express = require("express");
const router = express.Router();
const { Start } = require("../controllers/start.controller.js");
const { Text } = require("../controllers/text.controller.js");
const { checkPincode } = require("../controllers/testing.controller.js");
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

router.post("/", async (req, res) => {
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

      const root = body_param.entry[0].changes[0].value.messages[0];

      let from = root.from;

      let type = root.type;

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("type" + type);
      //   console.log("boady param " + msg_body);

      if (type === "text") {
        const type_obj = root.text;

        let num = -1;
        // console.log("type_obj" + checkPincode(type_obj.body));

        if (type_obj.body === "hi" || type_obj.body === "Hi") {
          let msg_body = type_obj.body;
          Start(phon_no_id, from, msg_body, req, res);
        }

        checkPincode(type_obj.body)
          .then((result) => {
            console.log(result);
            num = result;

            if (num === 0) {
                const body = {
                  msg: "Service is avialable for this pincode",
                };
                Text(phon_no_id, from, body, req, res);
              } else if (num === 1) {
                const body = {
                  msg: "Service is not avialable for this pincode",
                };
                Text(phon_no_id, from, body, req, res);
              } else if (num === 2) {
                const body = {
                  msg: "Invalid Pincode, Please type \"Hi\" to begin a new chat",
                };
                Text(phon_no_id, from, body, req, res);
              } else {
                const body = {
                  msg: 'Thanks to reaching us Please type "Hi" to begin a newknkhkhhh chat',
                };
                console.log("type_obj" + num);
                Text(phon_no_id, from, body, req, res);
              }
          })
          .catch((error) => console.error(error));


      } else if (type === "interactive") {
        const type_obj = root.interactive;

        console.log("type_obj" + JSON.stringify(type_obj, null, 2));

        if (
          type_obj &&
          type_obj.type === "button_reply" &&
          type_obj.button_reply &&
          type_obj.button_reply.id === "change-button" &&
          type_obj.button_reply.title === "Enter Pincode"
        ) {
          const body = {
            msg: "Enter Pincode eg. : 400001",
          };
          Text(phon_no_id, from, body, req, res);
        }
      } else if (type === "image") {
        const type_obj = root.image;
      } else {
      }
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
