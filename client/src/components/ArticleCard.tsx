import React from 'react';
import { ArticleCardProps, ArticleCardState, ArticleMedia } from '../interfaces';
import ImageModal from './ImageModal';
import ShareModal from './ShareModal';
import { Card, Box, CardMedia, Typography, IconButton, Button, Tooltip, Link } from '@mui/material';
import { Share, /* Bookmark, */ BookmarkBorder } from '@mui/icons-material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TimeAgo from 'timeago-react';


class ArticleCard extends React.Component<ArticleCardProps, ArticleCardState> {
  constructor(props: ArticleCardProps) {
    super(props);
    this.state = {
      imageModalStatus: false,
      shareModalStatus: false
    }
    this.imageModalHandler = this.imageModalHandler.bind(this);
    this.shareModalHandler = this.shareModalHandler.bind(this);

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

  render () {
    const { abstract, byline, multimedia, published_date, section, short_url, title, url } = this.props.article;
    const utcTime = new Date(published_date).toLocaleString();

    let noMultimedia = true;
    let thumbnail: ArticleMedia;
    let largeThumbnail: ArticleMedia;
    if (multimedia) {
      noMultimedia = false;
      thumbnail = multimedia[2];
      largeThumbnail = multimedia[1];
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
                  sx={{ width: thumbnail!.width }}
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
        <Typography variant="subtitle2" gutterBottom component="div" sx={{ gridArea: 'byline', fontSize: 12 }}>
          {`${byline} (`}<TimeAgo datetime={utcTime} />{`)`}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{ gridArea: 'abstract', overflowY: 'hidden', fontSize: 12 }}>
          {`${abstract}`}
        </Typography>
        <Tooltip title={`SEE MORE ${section.toUpperCase()} NEWS`} arrow>
          <Button variant="outlined" sx={{ gridArea: 'section', fontSize: 12, margin: 'auto' }}>
            {section}
          </Button>
        </Tooltip>
        <Tooltip title="bookmark article" arrow>
          <IconButton sx={{ gridArea: 'bookmark' }} aria-label="bookmark">
            <BookmarkBorder />
          </IconButton>
        </Tooltip>
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
