import { AxiosError } from 'axios';
import { Response } from 'express';
import { MongooseError } from 'mongoose';

const apiErrorHandler = (error: AxiosError, res: Response) => {
  console.error(error.message);
  console.error(error.response?.data);
  res.status(500).send('server error');
};

const dbErrorHandler = (error: MongooseError, res: Response) => {
  console.error(error);
  res.status(500).end();
};

export { apiErrorHandler, dbErrorHandler };
