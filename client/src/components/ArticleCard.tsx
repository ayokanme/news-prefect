import React from 'react';
import { ArticleCardProps, ArticleMedia } from '../interfaces';

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import en_US from 'timeago.js/lib/lang/en_US';

timeago.register('en_US', en_US);


class ArticleCard extends React.Component<ArticleCardProps> {
  constructor(props: ArticleCardProps) {
    super(props);
  }

  render () {
    const { abstract, byline, published_date, section ,short_url, subsection, title, url } = this.props.article;
    // const thumbnail = this.props.article.multimedia[2] || {url: '', caption: ''};
    // const thumbnail = multimedia.find((image: ArticleMedia) => image.format === 'Large Thumbnail');
    // const fullImage = multimedia.find((image: ArticleMedia) => image.format === 'Super Jumbo');
    const utcTime = new Date(published_date).toLocaleString();

    return (
      <div className="articleCard">
        {/* <div className="articleCardImage" style={{ display: 'inline-block'}}>
          <img src={thumbnail.url} className="articleThumbnail" alt={thumbnail.caption} />
        </div> */}
        <div className="articleDetails" style={{ display: 'inline-block'}}>
          <span className="articleTitle">
            <a className="articleLink" href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </span>
          <span className="articleAuthor">
           {`${byline} (`}
            <TimeAgo datetime={utcTime} locale="en_US" />
            {`)`}
          </span>
          <span className="articleAbstract">{`${abstract}..`}</span>
          <span className="articleTags">{`${section}, ${subsection}`}</span>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
