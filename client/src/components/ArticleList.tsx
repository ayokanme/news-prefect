import React from 'react';
import Footer from './Footer';
import ArticleCard from './ArticleCard';
import SectionsDrawer from './modals/SectionsDrawer';
import { ArticleListProps, ArticleListState } from '../interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';

class ArticleList extends React.Component<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps) {
    super(props);

    const { articles } = this.props;
    this.state = {
      initialized: false,
      articles: articles
    };
  }

  componentDidMount() {
    const { initialized } = this.state;
    this.setState({
      initialized: !initialized,
    });
  }

  componentDidUpdate(prevProps: ArticleListProps) {
    if (this.props.articles !== prevProps.articles) {
      this.setState({
        articles: this.props.articles
      });
    }
  }

  getLoadingIndicator() {
    return (
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        aria-label="loading message and progress circle"
        aria-busy={true}
      >
        <Typography>One moment while I fetch you the latest stories...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  getList() {
    return (
      <div
        className="ArticlesPage"
        style={{ position: 'fixed', top: '10%', left: 0, height: '90%', overflowY: 'scroll', width: '100%' }}
      >
        <div className="ArticleList" style={{ minHeight: '80%'}}>
          {
            this.state.articles.map((articleData) => {
              return (<ArticleCard article={articleData} />);
            })
          }
        </div>
        <SectionsDrawer
          isOpen={this.props.isOpen}
          drawerToggler={this.props.drawerToggler}
          sections={this.props.sections}
          getSectionArticles={this.props.getSectionArticles}
        />
        <Footer />
      </div>
    );
  }

  render() {
    const { initialized } = this.state;
    const { isLoading } = this.props;

    if (!initialized || isLoading) {

      return this.getLoadingIndicator();

    } else if (initialized && !isLoading) {

      return this.getList();

    }

  }
}

export default ArticleList;
