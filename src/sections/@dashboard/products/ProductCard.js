// import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// components
// import Label from '../../../components/label';
// import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };

export default function ShopProductCard({ product, handleCart }) {
  const navigate = useNavigate();
  // const { name, cover, price, colors, status, priceSale } = product;
  const { name, photo, price, stock, _id } = product;

  console.log('_id', _id);
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}
        <StyledProductImg alt="img" src={photo} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ margin: '0px' }}>
          <span>{name}</span> <span style={{ fontSize: '15px', margin: '0px' }}> {` ₹ ${price}`}</span>
        </Stack>

        {/* <Button
          variant="outline"
          disabled={stock === 0}
          onClick={() => navigate(`/macho-man-shop/products/${_id}`, { replace: false })}
        >
          {stock === 0 ? <span style={{ color: 'red' }}>out of stock</span> : <span> View</span>}
        </Button> */}
        <Button
          variant="outline"
          disabled={stock === 0}
          onClick={() => navigate(`/products/${_id}`, { replace: false })}
        >
          {stock === 0 ? <span style={{ color: 'red' }}>out of stock</span> : <span> View</span>}
        </Button>
      </Stack>
    </Card>
  );
}
