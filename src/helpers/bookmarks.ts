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

const handleBookmark = (req: Request, res: Response) => {
  const { newsPrefect } = req.cookies;
  const { isBookmarked, uri } = req.body;

  console.log('sessionId: ', newsPrefect, '; isBookmarked: ', isBookmarked, '; uri: ', uri);
};

// const addBookmark = () => {

//   User.findOneAndUpdate({ 'sessionId': req.cookies.newsPrefect },
//     { $push: { 'bookmarks': req.body.bookmark }}
//   )
//     .then((user) => {

//     })
//     .catch((err) => {

//     });

// };


// const deleteBookmark = () => {


//   User.findOneAndUpdate({ 'sessionId': req.cookies.newsPrefect },
//     { $pull: { 'bookmarks': { 'uri': { uri } }}}
//   )
//     .then((user) => {

//     })
//     .catch((err) => {
//       console.error(err);

//     });
// };


export { getBookmarks, handleBookmark };
