import { useEffect, useState } from 'react';
import OrderTable from './OrderTable';
import { getCart } from '../../helpers/AddToCart.js';
import Config from '../../config';
import { getUserData } from '../../helpers/Auth';

function Order() {
  const [items, setItems] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const data = getCart();
    console.log(data);
    setItems(
      data.map(e => ({
        id: e.id,
        name: e.product_name,
        price: e.price,
        seller: e.seller.username,
        description: e.description,
        stock: e.stock,
        image: Config.API_URL + e.photos[0].formats.thumbnail.url,
        qty: e.qty,
      }))
    );
  }, [refetch]);

  function toggleRefetch() {
    setRefetch(!refetch);
  }

  return <OrderTable products={items} toggleRefetch={toggleRefetch} />;
}

export default Order;
