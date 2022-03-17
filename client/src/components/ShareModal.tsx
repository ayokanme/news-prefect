import React from 'react';
import { Modal, Card, Typography, CardContent, TextField, Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareModalProps, ShareModalState } from '../interfaces';

class ShareModal extends React.Component <ShareModalProps, ShareModalState>{
  constructor(props: ShareModalProps) {
    super(props);
    this.state = {
      copied: false,
      copyButtonText: 'copy'
    };
    this.highlightCopy = this.highlightCopy.bind(this);
  }

  highlightCopy() {
    this.setState({
      copied: true,
      copyButtonText: 'copied'
    });
    setTimeout(
      () => this.setState({
        copied: false,
        copyButtonText: 'copy'
      }),
      2000
    );
  }

  render () {
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 450,
      height: 150,
      backgroundColor: '#f5f5f5',
      border: '1px solid #000',
      outline: 0,
      display: 'grid',
      gridTemplateColumns: '50px 3fr 1fr 30px',
      gridTemplateRows: '10px 40px 10px 70px 20px',
      gridTemplateAreas: `". . . ."
      ". title title ."
      ". . . ."
      ". inputField copyButton ."
      ". . . ."`,
    };

    const { modalStatus, modalHandler, shareLink } = this.props;

    return (
      <Modal
        open={modalStatus}
        onClose={() => modalHandler()}
        aria-labelledby="share article modal"
        aria-describedby="shortened article link in read-only input box"
      >
        <Card sx={style}>
          <CardContent sx={{ margin: 'auto', gridArea: 'title' }}>
            <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 20 }}>
              {'Share this article!'}
            </Typography>
          </CardContent>
          <TextField
            id="shortenedArticleLink"
            label="link"
            defaultValue={shareLink}
            InputProps={{
              readOnly: true
            }}
            sx={{ gridArea: 'inputField', margin: 'auto', width: 250 }}
          />
          <CopyToClipboard text={shareLink} onCopy={this.highlightCopy}>
            {
              !this.state.copied
              ?
              <Button sx={{ gridArea: 'copyButton', margin: 'auto' }} variant="outlined">
                {this.state.copyButtonText}
              </Button>
              :
              <Button sx={{ gridArea: 'copyButton', margin: 'auto' }} variant="contained">
                {this.state.copyButtonText}
              </Button>
            }
          </CopyToClipboard>
        </Card>
      </Modal>
    )
  }
}

export default ShareModal;
