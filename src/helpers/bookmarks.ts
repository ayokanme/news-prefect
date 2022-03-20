import { Request, Response } from 'express';
import { User } from '../db';


const getBookmarks = (sessionId: string) => {

  return User.findOne({ 'sessionId': sessionId })
    .then((user) => {

      if (user) {
        return user.bookmarks;
      } else {
        return [];
      }

    })
    .catch((err) => {
      console.error(err);
    });

};

const handleBookmark = (req: Request, res: Response) => {
  const sessionId = req.cookies.newsPrefect;
  const { isBookmarked, uri } = req.body;

  if (isBookmarked) {

    User.findOneAndUpdate({ 'sessionId': sessionId },
      { $pull: { 'bookmarks': uri }}
    )
      .then((user) => {
        if (user) {
          res.status(201).end();
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });

  } else {

    User.findOneAndUpdate({ 'sessionId': sessionId },
      { $push: { 'bookmarks': uri }}
    )
      .then((user) => {
        if (user) {
          res.status(201).end();
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });

  }

};




export { getBookmarks, handleBookmark };
