import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../helpers/Api';
import Config from '../../config';

function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async function () {
      const data = await getAllProducts();
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
        <ProductCard {...e} />
      ))}
    </Grid>
  );
}

export default Home;
