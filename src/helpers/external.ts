import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  baseUrl: 'https://api.nytimes.com/svc/topstories/v2',
  auth: process.env.NYT_API_KEY
};

const getTopStories = async (req: Request, res: Response) => {
  const topic = req.params.topic;

  return axios.get(`${options.baseUrl}/${topic}.json`, {
    params: { 'api-key': options.auth },
    responseType: 'json',
    validateStatus: (status) => status === 200
  })
    .then((success) => {
      res.status(200).json(success.data.results).end();
    })
    .catch((error) => {
      res.status(error.response.status)
        .json({
          error: error.message,
          message: error.response.data
        })
        .end();
    });
};

// const topStories = async (topic: string) => {
//   const success = await axios({
//     method: 'get',
//     url: `${options.baseUrl}/${topic}.json`,
//     params: {
//       'api-key': options.auth
//     },
//     responseType: 'json',
//     validateStatus: (status) => {
//       return status === 200;
//     }
//   });

//   return success.data.results;
// };

export { getTopStories };
