import { Request, Response } from 'express';
import { User } from '../db';


const getBookmarkUris = (sessionId: string) => {

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
  const { isBookmarked, uri, bookmarkObject } = req.body;

  if (isBookmarked) {

    User.findOneAndUpdate({ 'sessionId': sessionId },
      { $pull: { 'bookmarks': uri, 'bookmarkObjects': { 'uri': uri } }}
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
      { $push: { 'bookmarks': uri, 'bookmarkObjects': bookmarkObject }}
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

const fetchBookmarkObjects = (req: Request, res: Response) => {
  const sessionId = req.cookies.newsPrefect;

  User.findOne({ 'sessionId': sessionId })
    .then((user) => {
      if (user) {
        res.status(200).json(user.bookmarkObjects);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

};

export { getBookmarkUris, handleBookmark, fetchBookmarkObjects };
