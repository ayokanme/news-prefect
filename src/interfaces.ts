import { ArticleObject } from '../client/src/interfaces';

export interface User {
  email: string;
  password: string;
  bookmarks: ArticleObject[];
}
