import { Request, Response } from 'express';
import { User } from '../db';
import { dbErrorHandler } from './errorHandlers';


const getBookmarkUris = (sessionId: string, res: Response) => {

  return User.findOne({ 'sessionId': sessionId })
    .then((user) => {

      if (user) {
        return user.bookmarks;
      } else {
        return [];
      }

    })
    .catch((err) => dbErrorHandler(err, res));
};

const handleBookmark = (req: Request, res: Response) => {
  const sessionId = req.cookies.newsPrefect;
  const { isBookmarked, uri, bookmarkObject } = req.body;

  // if the uri received is currently bookmarked, unbookmark it... and vice versa
  if (isBookmarked) {

    User.findOneAndUpdate({ 'sessionId': sessionId },
      { $pull: { 'bookmarks': uri, 'bookmarkObjects': { 'uri': uri } }}
    )
      .then((user) => {
        if (user) {
          res.status(201).end();
        }
      })
      .catch((err) => dbErrorHandler(err, res));

  } else {

    User.findOneAndUpdate({ 'sessionId': sessionId },
      { $push: { 'bookmarks': uri, 'bookmarkObjects': bookmarkObject }}
    )
      .then((user) => {
        if (user) {
          res.status(201).end();
        }
      })
      .catch((err) => dbErrorHandler(err, res));
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
    .catch((err) => dbErrorHandler(err, res));
};

export { getBookmarkUris, handleBookmark, fetchBookmarkObjects };
