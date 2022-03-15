export interface ArticleMedia {
  url: string;
  format: "Super Jumbo" | "threeByTwoSmallAt2X" | "Large Thumbnail";
  height: number;
  width: number;
  type: string;
  caption: string;
}

export interface ArticleObject {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  published_date: string;
  multimedia: ArticleMedia[];
  short_url: string;
}

export interface AppState {
  results: ArticleObject[];
  initialized: boolean;
}

export interface ArticleCardProps {
  article: ArticleObject;
}

export interface AppProps {}
