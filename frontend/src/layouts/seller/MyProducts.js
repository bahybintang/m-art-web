import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import ProductTable from './ProductTable';
import { getAllProductsBySellerId } from '../../helpers/Api';
import Config from '../../config';
import { getUserData } from '../../helpers/Auth';

function MyProducts() {
  const [items, setItems] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    (async function () {
      const data = await getAllProductsBySellerId(getUserData().id);
      setItems(
        data.map(e => ({
          id: e.id,
          name: e.product_name,
          price: e.price,
          seller: e.seller.username,
          description: e.description,
          stock: e.stock,
          image: Config.API_URL + e.photos[0].formats.thumbnail.url,
        }))
      );
    })();
  }, [refetch]);

  function toggleRefetch() {
    setRefetch(!refetch);
  }

  return <ProductTable products={items} toggleRefetch={toggleRefetch} />;
}

export default MyProducts;
