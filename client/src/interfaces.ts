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
}

export interface HomeProps {}

export interface HomeState {
  results: ArticleObject[];
  initialized: boolean;
  isDrawerOpen: boolean;
}

export interface ArticleListProps {
  articles: ArticleObject[];
  isOpen: boolean;
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
  // cookie: string;
  accessGranted: boolean;
}
