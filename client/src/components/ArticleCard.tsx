import React from 'react';
import { ArticleCardProps } from '../interfaces';
import { Card, Box, CardMedia, Typography, IconButton, Button, Tooltip, Link } from '@mui/material';
import { Share, Bookmark, BookmarkBorder } from '@mui/icons-material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TimeAgo from 'timeago-react';


class ArticleCard extends React.Component<ArticleCardProps> {
  // constructor(props: ArticleCardProps) {
  //   super(props);
  // }

  render () {
    const { abstract, byline, multimedia, published_date, section, short_url, title, url } = this.props.article;
    const utcTime = new Date(published_date).toLocaleString();
    const thumbnail = multimedia[2];
    const superJumbo = multimedia[0];


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
          "thumbnail abstract share"
          "thumbnail section share"`,
          width: 700,
          height: 150,
          margin: '10px auto',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Box sx={{ gridArea: 'thumbnail' }}>
          <Tooltip title={thumbnail.caption} placement="bottom" arrow>
            <CardMedia
              component="img"
              sx={{ width: thumbnail.width }}
              image={thumbnail.url}
              alt={thumbnail.caption}
            />
          </Tooltip>
        </Box>
        <Link href={url} underline="hover" variant="subtitle1" gutterBottom component="span" sx={{ gridArea: 'title', margin: 'auto', fontSize: 14, cursor: 'pointer' }}>
          {title}
        </Link>
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
        <Tooltip title="share article" arrow>
          <IconButton sx={{ gridArea: 'share' }} aria-label="share">
            <Share />
          </IconButton>
        </Tooltip>
      </Card>
    );
  }
}

export default ArticleCard;


// return (
//   <Card elevation={6} sx={{ display: 'block', width: 700, height: 150, margin: '10px auto', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
//     <Box sx={{ display: 'inline-block' }}>
//       <Tooltip title={thumbnail.caption} placement="bottom" arrow>
//         <CardMedia
//           component="img"
//           sx={{ width: thumbnail.width }}
//           image={thumbnail.url}
//           alt={thumbnail.caption}
//         />
//       </Tooltip>
//     </Box>
//     <Box sx={{ display: 'inline-block', verticalAlign: 'top', width: 550, height: 150 }}>
//       <CardContent sx={{ display: 'block', maxHeight: 80, padding: 0, verticalAlign: 'top' }}>
//         <Link href={url} underline="hover" variant="subtitle1" gutterBottom component="span" sx={{ fontSize: 14, cursor: 'pointer' }}>
//           {title}
//         </Link>
//         <Typography variant="subtitle2" gutterBottom component="div" sx={{ display: 'block', fontSize: 12 }}>
//           {`${byline} (`}<TimeAgo datetime={utcTime} />{`)`}
//         </Typography>
//       </CardContent>
//       <Box sx={{ display: 'block', padding: 0, maxHeight: 90, verticalAlign: 'bottom' }}>
//         <CardContent sx={{ display: 'inline-block', width: 500, padding: 0 }}>
//           <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 12 }}>
//             {`${abstract}..`}
//           </Typography>
//           <Tooltip title={`SEE MORE ${section.toUpperCase()} NEWS`} arrow>
//             <Button variant="outlined" sx={{ fontSize: 12, verticalAlign: 'bottom' }}>{section}</Button>
//           </Tooltip>
//         </CardContent>
//         <Box sx={{ display: 'inline-block', width: 50, verticalAlign: 'bottom' }}>
//           <Tooltip title="share article" arrow>
//             <IconButton aria-label="share">
//               <Share />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
//     </Box>
//   </Card>
// );