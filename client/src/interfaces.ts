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
  uri: string;
  byline: string;
  published_date: string;
  multimedia: ArticleMedia[];
  short_url: string;
  isBookmarked: boolean;
}

export interface HomeProps {}

interface sectionListItem {
  section: string;
  display_name: string;
}

export interface HomeState {
  topStories: ArticleObject[];
  sectionList: sectionListItem[];
  sectionArticles: ArticleObject[];
  bookmarks: ArticleObject[];
  initialized: boolean;
  isDrawerOpen: boolean;
  isArticleListLoading: boolean;
}

export interface ArticleListProps {
  articles: ArticleObject[];
  sections: sectionListItem[];
  isOpen: boolean;
  isLoading: boolean;
  getSectionArticles: Function;
  drawerToggler: Function;
}

export interface ArticleListState {
  initialized: boolean;
}

export interface ArticleCardProps {
  article: ArticleObject;
}

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

export interface SectionsDrawerProps {
  isOpen: boolean;
  drawerToggler: Function;
  sections: sectionListItem[];
  getSectionArticles: Function;
}

export interface SectionsDrawerState {}

export interface HeaderState {}

export interface HeaderProps {
  drawerToggler: Function;
}

export interface AuthFormProps {
  registerUser: boolean;
  formHandler: Function;
}

export interface AuthFormState {
  passwordLongEnough: boolean;
  name: string;
  email: string;
  password: string;
}

export interface AuthPageProps {
  verifyUser: Function;
}

export interface AuthPageState {
  newUser: boolean;
  error: string;
}

export interface AppProps {
  cookies: any;
}

export interface AppState {
  accessGranted: boolean;
}
