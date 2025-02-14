const crypto = require("crypto");
const { CLIENT_SECRET, CLIENT_ID } = require("./const");

const generateSecretHash = (username) => {
  return crypto
    .createHmac("sha256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64");
}

const transformArrayToObject = (array) => {
  return array.reduce((acc, item) => {
    acc[item.Name] = item.Value;
    return acc;
  }, {});
}

const convertObjectToNameValueArray = (obj, prefix = '', excludePrefix = []) => {
  return Object.entries(obj).map(([key, value]) => ({ Name: `${excludePrefix.includes(key) ? '' : prefix}${key}`, Value: value }));
}

const removeCustomPrefix = (array) => {
  return array.map(item => ({
    ...item,
    Name: item.Name.replace(/^custom:/, '') 
  }));
}

const removeUserResponseInformation = (responseUserData) => {
  delete responseUserData.selfie_with_id_card;
  delete responseUserData.id_card_image_url;
  delete responseUserData.utility_bill_url;

  return responseUserData;
}

module.exports = {
  generateSecretHash,
  transformArrayToObject,
  convertObjectToNameValueArray,
  removeCustomPrefix,
  removeUserResponseInformation
};
