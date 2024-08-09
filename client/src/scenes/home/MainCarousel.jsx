import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import heroImage from '../../assets/Brewed Awakening.jpg';

// Imports all images from the assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context('../../assets', false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  // Single image with text overlay
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      >
      <img
        src={heroImage}
        alt='hero'
        style={{
          width: '75%',
          height: 'auto',
          objectFit: 'cover',
          backgroundAttachment: 'fixed'
        }}
      />
    </Box>
  );

  // Carousel component with custom arrows
  // return (
  //   <Carousel
  //     infiniteLoop={true}
  //     showThumbs={false}
  //     showIndicators={false}
  //     showStatus={false}
  //     renderArrowPrev={(onClickHandler, hasPrev, label) => (
  //       <IconButton
  //         onClick={onClickHandler}
  //         sx={{
  //           position: 'absolute',
  //           top: '50%',
  //           left: '0',
  //           color: 'white',
  //           padding: '5px',
  //           zIndex: '10'
  //         }}
  //       >
  //         <NavigateBeforeIcon sx={{ fontSize: 40 }} />
  //       </IconButton>
  //     )}
  //     renderArrowNext={(onClickHandler, hasNext, label) => (
  //       <IconButton
  //         onClick={onClickHandler}
  //         sx={{
  //           position: 'absolute',
  //           top: '50%',
  //           right: '0',
  //           color: 'white',
  //           padding: '5px',
  //           zIndex: '10'
  //         }}
  //       >
  //         <NavigateNextIcon sx={{ fontSize: 40 }} />
  //       </IconButton>
  //     )}
  //   >
  //     {Object.values(heroTextureImports).map((texture, index) => (
  //       <Box key={`carousel-image-${index}`}>
  //         <img
  //           src={texture}
  //           alt={`carousel-${index}`}
  //           style={{
  //             width: '40%',
  //             height: 'auto',
  //             objectFit: 'cover',
  //             backgroundAttachment: 'fixed'
  //           }}
  //         />
  //         <Box
  //           color='white'
  //           padding='20px'
  //           borderRadius='1px'
  //           backgroundColor='rgba(0, 0, 0, 0.4)'
  //           position='absolute'
  //           top='46%'
  //           left={isNonMobile ? '10%' : '0'}
  //           right={isNonMobile ? undefined : '0'}
  //           margin={isNonMobile ? undefined : '0 auto'}
  //           maxWidth={isNonMobile ? undefined : '240px'}
  //         >
  //         </Box>
  //       </Box>
  //     ))}
  //   </Carousel>
  // );
};

export default MainCarousel;