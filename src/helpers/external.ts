import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  baseUrl: 'https://api.nytimes.com/svc/topstories/v2',
  auth: process.env.NYT_API_KEY
};

const topStories = (topic: string) => {
  return axios({
    method: 'get',
    url: `${options.baseUrl}/${topic}.json`,
    params: {
      'api-key': options.auth
    },
    responseType: 'json',
    validateStatus: (status) => {
      return status === 200;
    }
  })
    .then((success) => {
      return success.data;
    });
};

export default topStories;