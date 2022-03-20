import mongoose from 'mongoose';
import { UserType } from './interfaces';


mongoose.connect('mongodb://127.0.0.1/news-prefect')
  .then(() => {
    console.log('Connected to app database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });


const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: { type: [ String ], required: false },
  sessionId: { type: String }
});


export const User = mongoose.model('User', userSchema);
