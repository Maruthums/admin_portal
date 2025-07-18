import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Paper, useMediaQuery } from '@mui/material';
import BasicSelect from '../../components/DropDown';
import BasicModal from '../../components/Model';
import { color } from '../../styles/color';
import { store } from '../../service/redux/store';
import { getEventImageFolders } from '../../service/apis/userService';
import { useSelector } from 'react-redux';
import GroupedImageLists from './GroupedImageList';
import TransparentLoader from '../../components/TransparentLoader';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));
  const { eventImage } = useSelector(({ user }: any) => user);
  const [fav, setFav] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<any>('');
  const openModel = (item: any) => {
    setOpen((pre) => !pre);
    setImage(item);
  }

  React.useEffect(() => {
    const fetchList = async () => {
      await store.dispatch(getEventImageFolders({}));
    }
    fetchList();
  }, [])

  const handleDownload = async () => {
    try {
      const response = await fetch(image.img, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = image.title || 'download.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image.');
    }
  };


  const RenderModel = React.useCallback(() => {
    return (
      <div style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}>

        <img
          src={image.img}
          alt={image.title}
          style={{
            width: isMobile ? '250px' : '700px',
            height: isMobile ? '250px' : 'auto',
            objectFit: 'contain'
          }}
          loading="lazy"
        />
        <Box >
          <span style={{
            fontFamily: 'sans-serif',
            fontSize: '18px',
            color: color.Mono5,
            paddingRight: isMobile ? '10px' : '20px'
          }}>{image.title}</span>
          <Button
            onClick={() => handleDownload()}
            sx={{
              background: color.DarkBlue,
              color: color.White,
              fontWeight: '500'
            }}
          >
            Download Image
          </Button>
        </Box>
      </div>
    )
  }, [image])

  return (
    <Box>
      {eventImage?.isLoading
                && <TransparentLoader />}
      <BasicSelect data={Object.keys(eventImage?.data)} label={'Select'} setDropDown={setFav} dropDown={fav} width={250} />
      {open &&
        <BasicModal open={open} setOpen={setOpen}>
          <RenderModel />
        </BasicModal>
      }
      <Paper sx={{
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        mt: 1
      }}>
       <GroupedImageLists groupedData={eventImage?.data} />
      </Paper>
    </Box>
  );
}

