import { Request, Response } from 'express';
import { User } from '../db';


const getBookmarks = (sessionId: string) => {

  return User.findOne({ 'sessionId': sessionId })
    .then((user) => {

      if (user) {
        return user.bookmarks;
      } else {
        return;
      }

    })
    .catch((err) => {
      console.error(err);
    });

};

const addBookmark = (req: Request, res: Response) => {

  User.findOneAndUpdate({ 'sessionId': req.cookies.newsPrefect },
    { $push: { 'bookmarks': req.body.bookmark }}
  )
    .then((user) => {

      if (user) {
        res.status(201).end();
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });

};


const deleteBookmark = (req: Request, res: Response) => {

  const { uri } = req.body;

  User.findOneAndUpdate({ 'sessionId': req.cookies.newsPrefect },
    { $pull: { 'bookmarks': { 'uri': { uri } }}}
  )
    .then((user) => {

      if (user) {
        res.status(204).end();
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });
};


export { addBookmark, getBookmarks, deleteBookmark };
