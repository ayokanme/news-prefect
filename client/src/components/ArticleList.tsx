import React from 'react';
import Footer from './Footer';
import ArticleCard from './ArticleCard';
import SectionsDrawer from './SectionsDrawer';
import { ArticleListProps, ArticleListState } from '../interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';

class ArticleList extends React.Component<ArticleListProps, ArticleListState>{
  constructor(props: ArticleListProps) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { initialized } = this.state;

    this.setState({
      initialized: !initialized
    });
  }

  render () {
    const { initialized } = this.state;

    if (initialized) {
      return (
        <div className="ArticlesPage" style={{ position: 'fixed', top: '10%', left: 0, maxHeight: '90%', overflowY: 'scroll', width: '100%' }}>
          <div className="ArticleList">
            {
              this.props.articles.map((articleData) => {
                return (
                  <ArticleCard article={articleData} />
                )
              })
            }
          </div>
          <SectionsDrawer isOpen={this.props.isOpen} drawerToggler={this.props.drawerToggler} sections={this.props.sections}/>
          <Footer />
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
            One moment while I fetch you the latest stories...
          </Typography>
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default ArticleList;
