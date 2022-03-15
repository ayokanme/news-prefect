import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  baseUrl: 'https://api.nytimes.com/svc/topstories/v2',
  auth: process.env.NYT_API_KEY
};

const topStories = async (topic: string) => {
  const success = await axios({
    method: 'get',
    url: `${options.baseUrl}/${topic}.json`,
    params: {
      'api-key': options.auth
    },
    responseType: 'json',
    validateStatus: (status) => {
      return status === 200;
    }
  });

  return success.data.results;
};

export default topStories;
