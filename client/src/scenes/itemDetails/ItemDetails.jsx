import { Box, Button, IconButton, Typography, Snackbar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Item from '../../components/Item';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../../theme';
import { addToCart } from '../../state';
import { useDispatch } from 'react-redux';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: 'GET',
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: 'GET',
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count } }));
    setCount(1);
    setOpenSnackbar(true);
  };

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* Image */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            alt={item?.name}
            width='100%'
            height='auto'
            src={`http://localhost:1337${item?.image?.formats?.medium?.url}`}
            style={{ objectFit: 'contain', maxHeight: '500px' }}
          />
        </Box>

        {/* Actions */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography
              variant='h3'
              fontWeight='bold'
              sx={{ fontSize: '2rem' }}
            >
              {item?.name}
            </Typography>
            <Typography>${item?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.shortDescription}
            </Typography>
          </Box>

          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border={`1.5px solid ${shades.neutral[300]}`}
              mr='20px'
              p='2px 5px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>
              CATEGORIES:{' '}
              {item?.category
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Information */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='DESCRIPTION' value='description' />
          <Tab label='REVIEWS' value='reviews' />
        </Tabs>
      </Box>
      <Box display='flex' flexWrap='wrap' gap='15px'>
        {value === 'description' && <div>{item?.longDescription}</div>}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

      {/* Related Products */}
      <Box mt='50px' width='100%'>
        <Typography variant='h3' fontWeight='bold' sx={{ fontSize: '2rem' }}>
          Related Products
        </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap='wrap'
          columnGap='1.33%'
          justifyContent='space-between'
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          sx: {
            mt: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.50rem',
            fontWeight: 'bold',
            backgroundColor: shades.primary[300],
            color: 'white',
            borderRadius: '5px',
            padding: '10px 20px',
          },
        }}
        message='Item added to cart'
      />
    </Box>
  );
};

export default ItemDetails;
