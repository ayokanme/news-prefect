import mongoose from 'mongoose';
import { ArticleMedia, ArticleObject } from '../client/src/interfaces';
import { UserType } from './interfaces';


mongoose.connect('mongodb://127.0.0.1/news-prefect')
  .then(() => {
    console.log('Connected to app database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });


const multimediaSchema = new mongoose.Schema<ArticleMedia>({
  url: { type: String, required: true },
  format: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  type: { type: String, required: true },
  caption: { type: String, required: true },
});

const bookmarkSchema = new mongoose.Schema<ArticleObject>({
  section: { type: String, required: true },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  url: { type: String, required: true },
  uri: { type: String, required: true, unique: true },
  byline: { type: String, required: true },
  published_date: { type: String, required: true },
  multimedia: { type: [ multimediaSchema ], required: false },
  short_url: { type: String, required: true }
});

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: { type: [ bookmarkSchema ], required: false },
  sessionId: { type: String, unique: true }
});


export const User = mongoose.model('User', userSchema);