import React from 'react';
import { Card, Box, CardContent, CardMedia, Typography, IconButton, Button, Tooltip, Link } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { ArticleCardProps } from '../interfaces';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TimeAgo from 'timeago-react';


class ArticleCard extends React.Component<ArticleCardProps> {
  constructor(props: ArticleCardProps) {
    super(props);
  }

  render () {
    const { abstract, byline, multimedia, published_date, section, short_url, title, url } = this.props.article;
    const utcTime = new Date(published_date).toLocaleString();
    const thumbnail = multimedia[2];


    return (
      <Card elevation={6} sx={{ display: 'block', maxWidth: 700, maxHeight: 150, margin: 1 }}>
        <Box sx={{ display: 'inline-block' }}>
          <Tooltip title={thumbnail.caption} placement="bottom" arrow>
            <CardMedia
              component="img"
              sx={{ width: thumbnail.width }}
              image={thumbnail.url}
              alt={thumbnail.caption}
            />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top', maxWidth: 550 }}>
          <CardContent sx={{ display: 'block', padding: 0 }}>
            <Link href={url} underline="hover" variant="subtitle1" gutterBottom component="span" sx={{ cursor: 'pointer' }}>{title}</Link>
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ display: 'block', fontSize: 12 }}>
              {`${byline} (`}<TimeAgo datetime={utcTime} />{`)`}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'block', padding: 0 }}>
            <CardContent sx={{ display: 'inline-block', maxWidth: 500, padding: 0 }}>
              <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 12 }}>
                {`${abstract}..`}
              </Typography>
              <Tooltip title={`SEE MORE ${section.toUpperCase()} NEWS`} arrow>
                <Button variant="outlined" sx={{ fontSize: 12 }}>{section}</Button>
              </Tooltip>
            </CardContent>
            <Box sx={{ display: 'inline-block', maxWidth: 50 }}>
              <Tooltip title="share article" arrow>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }
}

export default ArticleCard;
