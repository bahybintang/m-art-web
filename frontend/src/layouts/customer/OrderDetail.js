import { useEffect, useState } from 'react';
import OrderDetailTable from './OrderDetailTable';
import { getCart } from '../../helpers/AddToCart.js';
import Config from '../../config';
import { getUserData } from '../../helpers/Auth';
import { useParams } from 'react-router-dom';
import { getOrderDetailsById } from '../../helpers/Api';

function OrderDetail() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(async () => {
    (async function () {
      const data = await getOrderDetailsById(id);
      setItems(
        data.map(e => ({
          id: e.product_id.id,
          name: e.product_id.product_name,
          price: e.unit_price,
          // seller: e.seller.username,
          seller: 'test uname',
          description: e.product_id.description,
          image: Config.API_URL + e.product_id.photos[0].formats.thumbnail.url,
          qty: e.quantity,
        }))
      );
    })();
  }, [refetch]);

  function toggleRefetch() {
    setRefetch(!refetch);
  }

  return <OrderDetailTable products={items} toggleRefetch={toggleRefetch} />;
}

export default OrderDetail;
