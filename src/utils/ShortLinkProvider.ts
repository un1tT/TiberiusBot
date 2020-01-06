import axios from 'axios';

import { TOCLICK_API } from '../constants/urls';
import { TOCLICK_TOCKEN } from '../constants/auth';

export const getShortLink = async (baseLink): Promise<string> => {
  const requestConfig = {
    url: TOCLICK_API,
    method: 'post',
    headers: {
      'X-AUTH-TOKEN': TOCLICK_TOCKEN,
      'Content-Type': 'application/json',
    },
    data: {
      data:
      {
        type: 'link',
        attributes:
        {
          web_url: baseLink,
        },
      },
    },
  };

  try {
    const { data: response } = await axios(requestConfig);
    return response.data.attributes.full_url;
  } catch (error) {
    console.log(error.response);
    return baseLink;
  }
};
