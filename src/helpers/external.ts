import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { getBookmarks } from './bookmarks';
import { ArticleObject } from '../../client/src/interfaces';

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
const newswireRequestConfig: AxiosRequestConfig = {
  params: {
    'limit': 100,
    'api-key': options.auth
  },
  responseType: 'json',
  validateStatus: (status) => status === 200
};

const getTopStories = (req: Request, res: Response) => {
  const topic = req.params.topic;

  return axios.get(`${options.topStoriesBaseUrl}/${topic}.json`, requestConfig)
    .then(async (response) => {

      const bookmarks = await getBookmarks(req.cookies.newsPrefect);

      const parsed = await response.data.results.map((article: ArticleObject) => {

        if (bookmarks?.includes(article.uri)) {
          return {...article, isBookmarked: true };
        } else {
          return {...article, isBookmarked: false };
        }

      });

      res.status(200).json(parsed);
    })
    .catch((error) => {
      console.error(error.message);
      console.error(error.response.data);

      res.status(500).json('server error');
    });

};

const getNewswireSectionList = (req: Request, res: Response) => {

  return axios.get(`${options.newswireBaseUrl}/section-list.json`, requestConfig)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((error) => {
      console.error(error.message);
      console.error(error.response.data);

      res.status(500).json('server error');
    });

};

const getNewswireSectionArticles = (req: Request, res: Response) => {
  const section = encodeURIComponent(req.params.section);

  return axios.get(`${options.newswireBaseUrl}/all/${section}.json`, newswireRequestConfig)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((error) => {
      console.error(error.message);
      console.error(error.response.data);

      res.status(500).json('server error');
    });

};

export { getTopStories, getNewswireSectionList, getNewswireSectionArticles };
