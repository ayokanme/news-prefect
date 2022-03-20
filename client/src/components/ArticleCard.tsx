import React from 'react';
import TimeAgo from 'timeago-react';
import axios from 'axios';
import { ArticleCardProps, ArticleCardState, ArticleMedia } from '../interfaces';
import ImageModal from './ImageModal';
import ShareModal from './ShareModal';
import { Card, Box, CardMedia, Typography, IconButton, Button, Tooltip, Link } from '@mui/material';
import { Share, Bookmark, BookmarkBorder } from '@mui/icons-material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


class ArticleCard extends React.Component<ArticleCardProps, ArticleCardState> {
  constructor(props: ArticleCardProps) {
    super(props);

    const { isBookmarked, uri } = this.props.article;
    this.state = {
      imageModalStatus: false,
      shareModalStatus: false,
      isBookmarked: isBookmarked,
      uri: uri
    }
    this.imageModalHandler = this.imageModalHandler.bind(this);
    this.shareModalHandler = this.shareModalHandler.bind(this);
    this.bookmarkHandler = this.bookmarkHandler.bind(this);
  }

  componentDidUpdate(prevProps: ArticleCardProps) {
    if (this.props.article.isBookmarked !== prevProps.article.isBookmarked) {
      this.setState({
        isBookmarked: this.props.article.isBookmarked
      });
    }
  }

  imageModalHandler() {
    const { imageModalStatus } = this.state;

    this.setState({
      imageModalStatus: !imageModalStatus
    });
  }

  shareModalHandler() {
    const { shareModalStatus } = this.state;

    this.setState({
      shareModalStatus: !shareModalStatus
    });
  }

  async bookmarkHandler() {
    const { uri, isBookmarked } = this.state;
    const { abstract, byline, multimedia, published_date, section, short_url, title, url } = this.props.article;

    const bookmarkObject = {
      section,
      title,
      abstract,
      url,
      uri,
      byline,
      published_date,
      multimedia,
      short_url,
      isBookmarked: !isBookmarked
    };

    this.setState({
      isBookmarked: !isBookmarked
    });

    axios.patch('/api/bookmarks', { uri, isBookmarked, bookmarkObject });
  }

  render () {
    const { abstract, byline, multimedia, published_date, section, short_url, title, url } = this.props.article;
    const utcTime = new Date(published_date).toLocaleString();

    let noMultimedia = true;
    let thumbnail: ArticleMedia | undefined;
    let largeThumbnail: ArticleMedia | undefined;
    if (multimedia) {
      noMultimedia = false;
      thumbnail = multimedia.find(image => (image.format === 'Large Thumbnail' || image.format === 'mediumThreeByTwo210') );
      largeThumbnail = multimedia.find(image => (image.format === 'threeByTwoSmallAt2X' || image.format === 'mediumThreeByTwo440') );
    }

    const noMultimediaPlaceholder: ArticleMedia = {
      url: 'https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg',
      format: '',
      height: 150,
      width: 150,
      type: '',
      caption: 'no image found'
    };

    return (
      <Card
        elevation={6}
        sx={{
          display: 'grid',
          gridTemplateColumns: '150px 10fr 1fr',
          gridTemplateRows: '50px 22px 20px 20px 38px',
          gridTemplateAreas: `"thumbnail title title"
          "thumbnail byline bookmark"
          "thumbnail abstract bookmark"
          "thumbnail abstract ."
          "thumbnail section share"`,
          width: 700,
          height: 150,
          margin: '10px auto',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Box sx={{ gridArea: 'thumbnail', cursor: 'pointer' }}>
          { !noMultimedia
            ?
            <>
              <Tooltip title={thumbnail!.caption} placement="bottom" arrow>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150 }}
                  image={thumbnail!.url}
                  onClick={this.imageModalHandler}
                  alt={thumbnail!.caption}
                />
              </Tooltip>
              <ImageModal photo={largeThumbnail!} modalHandler={this.imageModalHandler} modalStatus={this.state.imageModalStatus} />
            </>
            :
            <CardMedia
              component="img"
              sx={{ width: noMultimediaPlaceholder.width }}
              image={noMultimediaPlaceholder.url}
              alt={noMultimediaPlaceholder.caption}
            />
          }
        </Box>
        <Tooltip title="Read on NYTimes.com">
          <Link href={url}
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
          variant="subtitle1"
          gutterBottom
          component="a"
          sx={{ gridArea: 'title', margin: 'auto', fontSize: 14, cursor: 'pointer' }}
          >
            {title}
          </Link>
        </Tooltip>
        <Typography variant="subtitle2" gutterBottom component="div" sx={{ gridArea: 'byline', fontSize: 12, overflow: 'hidden' }}>
          {`${byline} (`}<TimeAgo datetime={utcTime} />{`)`}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{ gridArea: 'abstract', overflowY: 'hidden', fontSize: 12 }}>
          {`${abstract}`}
        </Typography>
        <Button variant="outlined" sx={{ gridArea: 'section', fontSize: 12, margin: 'auto' }}>
          {section}
        </Button>
        {
          this.state.isBookmarked
          ?
          <Tooltip title="unbookmark article" arrow>
            <IconButton onClick={this.bookmarkHandler} sx={{ gridArea: 'bookmark' }} aria-label="unbookmark article">
              <Bookmark />
            </IconButton>
          </Tooltip>
          :
          <Tooltip title="bookmark article" arrow>
            <IconButton onClick={this.bookmarkHandler} sx={{ gridArea: 'bookmark' }} aria-label="bookmark article">
              <BookmarkBorder />
            </IconButton>
          </Tooltip>
        }
        <Box sx={{ gridArea: 'share' }}>
          <Tooltip title="share article" arrow>
            <IconButton onClick={this.shareModalHandler} aria-label="share">
              <Share />
            </IconButton>
          </Tooltip>
          <ShareModal shareLink={short_url} modalHandler={this.shareModalHandler} modalStatus={this.state.shareModalStatus} />
        </Box>
      </Card>
    );
  }
}

export default ArticleCard;
