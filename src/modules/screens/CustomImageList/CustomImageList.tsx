import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material';
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
  }, []);

  const RenderModel = React.useCallback(() => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography sx={{
          mb: 2,
          fontSize: { xs: 16, md: 20 },
          fontWeight: 600,
          color: color.Mono5
        }}>
          Image full view.
        </Typography>
        <img
          src={`https://drive.google.com/thumbnail?id=${image.img}&sz=w1000`}
          alt={image.title}
          style={{
            width: isMobile ? '250px' : '600px',
            maxHeight: isMobile ? '250px' : '550px',
            objectFit: 'contain',
            alignSelf: 'center',
            borderRadius: '20px',
          }}
          loading="lazy"
        />
        <Box >
          <Typography sx={{
            mb: 2,
            fontSize: 14,
            fontWeight: 600,
            color: color.Mono5,
            textAlign: 'center',
            mt: 1
          }}>
            {image.title}
          </Typography>
        </Box>
      </div>
    )
  }, [image])

  return (
    <Box>
      {eventImage?.isLoading
        && <TransparentLoader />}
      <BasicSelect data={['All', ...Object.keys(eventImage?.data)]} label={'Select'} setDropDown={setFav} dropDown={fav} width={250} />
      {open &&
        <BasicModal open={open} setOpen={setOpen}>
          <RenderModel />
        </BasicModal>
      }
      <GroupedImageLists groupedData={eventImage?.data} openModel={openModel} />
    </Box>
  );
}

