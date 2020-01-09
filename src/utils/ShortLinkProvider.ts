import axios from 'axios';

import { TOCLICK_API } from '../constants/urls';
import { TOCLICK_TOKEN } from '../constants/auth';

export const getShortLink = async (baseLink): Promise<string> => {
  const requestConfig = {
    url: TOCLICK_API,
    method: 'post',
    headers: {
      'X-AUTH-TOKEN': TOCLICK_TOKEN,
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
    // @ts-ignore
    const { data: response } = await axios(requestConfig);
    return response.data.attributes.full_url;
  } catch (error) {
    console.log(error);
    return baseLink;
  }
};
