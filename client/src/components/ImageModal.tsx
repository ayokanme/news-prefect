import { Modal, Card, CardMedia, Typography, CardContent } from '@mui/material';
import { ImageModalProps } from '../interfaces';

const ImageModal = ({ photo, modalHandler, modalStatus }: ImageModalProps) => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: photo.width,
    height: photo.height + 120,
    backgroundColor: '#30302f',
    color: '#d6d6d2',
    border: '1px solid #000',
    outline: 0
  };

  return (
    <Modal
      open={modalStatus}
      onClose={() => modalHandler()}
      aria-labelledby="article image modal"
      aria-describedby="article image and caption in modal view"
    >
      <Card sx={style}>
        <CardMedia
          component="img"
          height={photo.height}
          image={photo.url}
          alt={photo.format}
        />
        <CardContent sx={{ padding: '5px' }}>
          <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 14 }}>
            { photo.caption !== '' ? `Caption: ${photo.caption}` : '(no image caption available)' }
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ImageModal;
