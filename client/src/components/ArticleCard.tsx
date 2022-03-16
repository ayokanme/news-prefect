import React from 'react';
import { Card, Box, CardContent, CardMedia, Typography, IconButton, Button, Tooltip, Link } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { ArticleCardProps } from '../interfaces';

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
      <Card sx={{ display: 'block' }}>
        <Tooltip title={thumbnail.caption} placement="bottom" arrow>
          <CardMedia
            component="img"
            sx={{ display: 'inline-block', width: thumbnail.width }}
            image={thumbnail.url}
            alt={thumbnail.caption}
          />
        </Tooltip>
        <Box sx={{ display: 'inline-block'}}>
          <CardContent sx={{ display: 'block' }}>
            <Link href={url} underline="hover">
              {title}
            </Link>
            <Typography>
                {`${byline} (`}
                <TimeAgo datetime={utcTime} />
                {`)`}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'block'}}>
            <CardContent sx={{ display: 'inline-block'}}>
              <Typography>
                {`${abstract}..`}
              </Typography>
              <Button variant="outlined">
                {section}
              </Button>
            </CardContent>
            <Box sx={{ display: 'inline-block'}}>
              <Tooltip title="share" arrow>
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
