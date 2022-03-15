import { ArticleObject } from '../client/src/interfaces';

export interface UserType {
  email: string;
  password: string;
  bookmarks: ArticleObject[];
}
