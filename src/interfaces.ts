import { ArticleObject } from '../client/src/interfaces';

export interface UserType {
  userId: number;
  name: string;
  email: string;
  password: string;
  bookmarks: ArticleObject[];
}
