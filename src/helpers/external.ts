import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  topStoriesBaseUrl: 'https://api.nytimes.com/svc/topstories/v2',
  newswireBaseUrl: 'https://api.nytimes.com/svc/news/v3/content',
  auth: process.env.NYT_API_KEY
};

const requestConfig: AxiosRequestConfig = {
  params: { 'api-key': options.auth },
  responseType: 'json',
  validateStatus: (status) => status === 200
};

// raise default result limit from 20 to 100 for newswire article requests
const newswireRequestConfig: AxiosRequestConfig = JSON.parse(JSON.stringify(requestConfig));
newswireRequestConfig.params.limit = 100;

const getTopStories = (req: Request, res: Response) => {
  const topic = req.params.topic;

  return axios.get(`${options.topStoriesBaseUrl}/${topic}.json`, requestConfig)
    .then((success) => {
      res.status(200)
        .json(success.data.results)
        .end();
    })
    .catch((error) => {
      console.error(error.message, ' ', error.response.data);
      res.status(error.response.status)
        .json('server error')
        .end();
    });

};

const getNewswireSectionList = (res: Response) => {

  return axios.get(`${options.newswireBaseUrl}/section-list.json`, requestConfig)
    .then((success) => {
      res.status(200)
        .json(success.data.results)
        .end();
    })
    .catch((error) => {
      console.error(error.message, ' ', error.response.data);
      res.status(error.response.status)
        .json('server error')
        .end();
    });

};

const getNewswireSectionArticles = (req: Request, res: Response) => {
  const section = req.params.section;

  return axios.get(`${options.newswireBaseUrl}/all/${section}.json`, newswireRequestConfig)
    .then((success) => {
      res.status(200)
        .json(success.data.results)
        .end();
    })
    .catch((error) => {
      console.error(error.message, ' ', error.response.data);
      res.status(error.response.status)
        .json('server error')
        .end();
    });

};

export { getTopStories, getNewswireSectionList, getNewswireSectionArticles };
