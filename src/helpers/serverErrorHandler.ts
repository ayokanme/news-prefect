import { Response } from 'express';

export const serverErrorHandler = (error: any, res: Response) => {
  console.error(error.message);
  console.error(error.response.data);
  res.status(500).send('server error');
};
