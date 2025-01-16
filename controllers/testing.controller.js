const axios = require("axios");
const { Text } = require("./text.controller");
require("dotenv").config();

const checkPincode = async (pincode) => {
    try {
      const url = `https://api.postalpincode.in/pincode/${pincode}`;
      const postalResponse = await axios.get(url);
  
      if (postalResponse.data[0].Status === "Success") {
        const pharmeasyUrl = `https://api.pharmeasy.in/v3/pincodes/details/${pincode}`;
        const pharmeasyResponse = await axios.get(pharmeasyUrl);
  
        if (pharmeasyResponse.data.data.cityAttributes.isMedicine) {
          return 0; // Valid pincode, medicine available
        }
  
        return 1; // Valid pincode, no medicine available
      }
  
      return 2; // Invalid pincode
    } catch (error) {
      console.error("Error validating pincode:", error.message);
      return -1; // Error occurred
    }
  };

exports.checkPincode = checkPincode;
