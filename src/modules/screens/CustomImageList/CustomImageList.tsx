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

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));

  const [fav, setFav] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<any>('');
  const openModel = (item: any) => {
    setOpen((pre) => !pre);
    setImage(item);
  }

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
          paddingRight:isMobile ? '10px' : '20px'
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

  console.log('image', image);


  return (
    <Box>
      <BasicSelect data={['Fav', "UnFav"]} label={'Select'} setDropDown={setFav} dropDown={fav} width={250} />
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
        <ImageList
          sx={{
            width: { sx: 500, md: 1000 },
            transform: 'translateZ(0)',
          }}
          rowHeight={200}
          gap={1}
        >
          {itemData.map((item) => {
            const cols = item.featured ? 2 : 1;
            const rows = item.featured ? 2 : 1;

            return (
              <ImageListItem onClick={() => openModel(item)} key={item.img} cols={cols} rows={rows}>
                <img
                  {...srcset(item.img, 250, 200, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={item.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      aria-label={`star ${item.title}`}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Paper>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
