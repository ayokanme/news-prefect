import React from 'react';
import { Modal, Card, CardMedia, Typography } from '@mui/material';
import { ImageModalProps } from '../interfaces';

const ImageModal = ({ photo, modalHandler, modalStatus }: ImageModalProps) => {

  return (
    <Modal
      open={modalStatus}
      onClose={() => modalHandler}
      aria-labelledby="article image modal"
      aria-describedby="article image and caption in modal view"
    >
      <Card sx={{ maxWidth: photo.width }}>
        <CardMedia
          component="img"
          height={photo.height}
          image={photo.url}
          alt="Super Jumbo image"
        />
          <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 12 }}>
            {photo.caption}
          </Typography>
      </Card>
    </Modal>
  );
};

export default ImageModal;
