import { useEffect, useState } from 'react';
import OrderTable from './OrderTable';
import { getCart } from '../../helpers/AddToCart.js';
import Config from '../../config';
import { getUserData } from '../../helpers/Auth';
import { getOrdersByCurrentCustomer } from '../../helpers/Api';

function Order() {
  const [items, setItems] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(async () => {
    (async function () {
      const data = await getOrdersByCurrentCustomer();
      setItems(
        data.map(e => ({
          id: e.id,
          payment_code: e.payment ? e.payment.payment_code : '-',
          seller: e.seller_id.username,
          courier: e.courier_id.name,
          item_count: e.order_details.length,
          shipping_cost: e.shipping_cost,
          total_price: e.total_price,
          status: e.status,
        }))
      );
    })();
  }, [refetch]);

  function toggleRefetch() {
    setRefetch(!refetch);
  }

  return <OrderTable products={items} toggleRefetch={toggleRefetch} />;
}

export default Order;
