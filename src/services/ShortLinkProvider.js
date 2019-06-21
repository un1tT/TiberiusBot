const { toclickAPI } = require('../constants/urls');
const axios = require('axios');
const {toclickToken} = require('../constants/auth');

const getShortLink = async (baseLink) => {
  const requestConfig = {
    url: toclickAPI,
    method: 'post',
    headers: {
      "X-AUTH-TOKEN": toclickToken,
      'Content-Type': 'application/json'
    },
    data: {
      "data":
      {
        "type": "link",
        "attributes":
        {
          "web_url": baseLink,
        }
      }
    }
  }
  try { 
    const { data: response } = await axios(requestConfig);
    const shortLink = response.data.attributes.full_url
    console.log(shortLink);
    return shortLink;
  } catch (error) {
    console.log(error.response);
    return baseLink;
  }

}

module.exports = getShortLink;