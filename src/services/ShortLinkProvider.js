const { toClickAPI } = require('../constants/urls');
const axios = require('axios');
const {toClickToken} = require('../constants/auth');

const getShortLink = async (baseLink) => {
  const requestConfig = {
    url: toClickAPI,
    method: 'post',
    headers: {
      "X-AUTH-TOKEN": toClickToken,
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
  };

  try {
    const { data: response } = await axios(requestConfig);
    return response.data.attributes.full_url;
  } catch (error) {
    console.log(error.response);
    return baseLink;
  }
};

module.exports = getShortLink;
