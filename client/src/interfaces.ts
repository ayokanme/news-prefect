export interface ArticleMedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  caption: string;
}

export interface ArticleObject {
  section: string;
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

export interface ArticleCardState {
  imageModalStatus: boolean;
  shareModalStatus: boolean;
}

export interface ImageModalProps {
  photo: ArticleMedia;
  modalHandler: Function;
  modalStatus: boolean;
}

export interface ShareModalProps {
  shareLink: string;
  modalHandler: Function;
  modalStatus: boolean;
}

export interface ShareModalState {
  copied: boolean;
  copyButtonText: string;
}
