import { ArticleObject } from "../client/src/interfaces";

export interface UserType {
  name: string;
  email: string;
  password: string;
  bookmarks: string[];
  sessionId: string;
  bookmarkObjects: ArticleObject[];
}
