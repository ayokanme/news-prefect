import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ArticleList from '../components/ArticleList';
import { HomeProps, HomeState } from '../interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import AccountPage from './AccountPage';


class Home extends React.Component<HomeProps, HomeState>{
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      initialized: false,
      isArticleListLoading: false,
      topStories: [],
      sectionList: [],
      sectionArticles: [],
      bookmarks: [],
      isDrawerOpen: false
    };
    this.getTopStories = this.getTopStories.bind(this);
    this.getSectionList = this.getSectionList.bind(this);
    this.fetchSectionArticles = this.fetchSectionArticles.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.fetchBookmarks = this.fetchBookmarks.bind(this);
  }

  componentDidMount() {
    this.getTopStories();
    this.fetchBookmarks();
    this.getSectionList();
  }

  getTopStories() {
    axios.get('/api/top-stories/home', { validateStatus: (status: number) => status === 200 })
      .then((response) => {
        this.setState({
          topStories: response.data,
          initialized: true
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  fetchBookmarks() {
    axios.get('/api/bookmarks', { validateStatus: (status: number) => status === 200 })
      .then((response) => {
        this.setState({
          bookmarks: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getSectionList() {
    axios.get('/api/newswire/section-list', { validateStatus: (status: number) => status === 200 })
      .then((response) => {
        this.setState({
          sectionList: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchSectionArticles(section: string) {

    this.setState({
      isArticleListLoading: true
    });

    axios.get(`/api/newswire/${section}/articles`, { validateStatus: (status: number) => status === 200 })
      .then((response) => {
        this.setState({
          sectionArticles: response.data,
          isArticleListLoading: false
        });

        this.getTopStories();
        this.fetchBookmarks();
      })
      .catch((error) => {
        console.error(error);
      });

  }

  toggleDrawer() {
    const { isDrawerOpen } = this.state;
    this.setState({
      isDrawerOpen: !isDrawerOpen
    });
  }


  render () {
    const { topStories, sectionList, sectionArticles, bookmarks, initialized, isDrawerOpen } = this.state;

    if (initialized) {
      return (
        <div className="App" style={{ textAlign: 'center', height: '100%' }}>
          <Header drawerToggler={this.toggleDrawer} />
          <Routes>
            <Route index element={<ArticleList articles={topStories} sections={sectionList} isOpen={isDrawerOpen} drawerToggler={this.toggleDrawer} getSectionArticles={this.fetchSectionArticles} isLoading={this.state.isArticleListLoading} />} />
            <Route path="bookmarks" element={<ArticleList articles={bookmarks} sections={sectionList} isOpen={isDrawerOpen} drawerToggler={this.toggleDrawer} getSectionArticles={this.fetchSectionArticles} isLoading={this.state.isArticleListLoading} />} />
            {
              sectionList.map(sectionItem => {
                return (
                  <Route path={`sections/${encodeURIComponent(sectionItem.section)}`} element={<ArticleList articles={sectionArticles} sections={sectionList} isOpen={isDrawerOpen} drawerToggler={this.toggleDrawer} getSectionArticles={this.fetchSectionArticles} isLoading={this.state.isArticleListLoading} />} />
                );
              })
            }
            <Route path="account" element={<AccountPage verifyUser={this.props.verifyUser}/>} />
          </Routes>
        </div>
      );
    } else {
      return (
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          aria-label="loading message and progress circle"
          aria-busy={true}
        >
          <Typography>
            Welcome. Please be patient while the app loads...
          </Typography>
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default Home;
