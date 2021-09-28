import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { getAllProductsBySellerId } from '../../helpers/Api';
import Config from '../../config';
import { getUserData } from '../../helpers/Auth';

function MyProducts() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async function () {
      const data = await getAllProductsBySellerId(getUserData().id);
      setItems(
        data.map(e => ({
          id: e.id,
          name: e.product_name,
          price: e.price,
          seller: e.seller.username,
          image: Config.API_URL + e.photos[0].formats.medium.url,
        }))
      );
    })();
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {items.map(e => (
        <ProductCard {...e} key={e.id} />
      ))}
    </Grid>
  );
}

export default MyProducts;
