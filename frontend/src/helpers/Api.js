import { fetchWithAuth, fetchFormData, getUserData } from './Auth';
import Config from '../config';

function getUrl(path) {
  return Config.API_URL + path;
}

async function getAllProducts() {
  let response = await fetchWithAuth(getUrl('/products'));
  let data = await response.json();
  return data;
}

async function getProductById(id) {
  let response = await fetchWithAuth(getUrl('/products/' + id));
  let data = await response.json();
  return data;
}

async function getAllCouriers() {
  let response = await fetchWithAuth(getUrl('/couriers'));
  let data = await response.json();
  return data;
}

async function getAddressesById(id) {
  let response = await fetchWithAuth(getUrl('/addresses?user_id.id=' + id));
  let data = await response.json();
  return data;
}

async function getPaymentLists() {
  let response = await fetchWithAuth(getUrl('/payment-lists'));
  let data = await response.json();
  return data;
}

async function addAddress(recipient, address, latitude, longitude, primary) {
  const { id } = getUserData();
  const response = await fetchWithAuth(getUrl('/addresses'), {
    method: 'POST',
    body: JSON.stringify({
      user_id: id,
      recipient,
      address,
      latitude,
      longitude,
      primary,
    }),
  });
  const data = await response.json();
  return data;
}

async function addOrder(
  total_price,
  shipping_cost,
  status,
  seller_id,
  address_id,
  courier_id,
  order_details
) {
  const { id } = getUserData();
  const response = await fetchWithAuth(getUrl('/orders'), {
    method: 'POST',
    body: JSON.stringify({
      user_id: id,
      total_price,
      shipping_cost,
      status,
      seller_id,
      address_id,
      courier_id,
      order_details,
    }),
  });
  const data = await response.json();
  return data;
}

async function getOrdersByCurrentCustomer() {
  const { id } = getUserData();
  const response = await fetchWithAuth(getUrl('/orders?user_id.id=' + id));
  const data = await response.json();
  return data;
}

async function getOrderDetailsById(id) {
  const response = await fetchWithAuth(getUrl('/order-details?order_id.id=' + id));
  const data = await response.json();
  return data;
}

async function addPayments(payment_code, payment_method, orders) {
  const response = await fetchWithAuth(getUrl('/payments'), {
    method: 'POST',
    body: JSON.stringify({
      payment_code,
      payment_method,
      orders,
    }),
  });
  const data = await response.json();
  return data;
}

async function addProduct(product_name, description, stock, price, photo) {
  // Upload image
  let formData = new FormData();
  formData.append('files', photo);
  let response = await fetchFormData(getUrl('/upload'), {
    method: 'POST',
    body: formData,
  });
  let data = await response.json();
  const photoId = data[0].id;

  response = await fetchWithAuth(getUrl('/products'), {
    method: 'POST',
    body: JSON.stringify({
      product_name,
      description,
      stock,
      price,
      seller: getUserData().id,
      photos: [photoId],
    }),
  });
  data = await response.json();
  return data;
}

async function addClickProductTracker(product_id) {
  const { id } = getUserData();
  let response = await fetchWithAuth(getUrl('/trackers'), {
    method: 'POST',
    body: JSON.stringify({
      product_id,
      user_id: id,
      event: 'click_product',
    }),
  });
  let data = await response.json();
  return data;
}

async function deleteProductById(id) {
  let response = await fetchWithAuth(getUrl('/products/' + id), {
    method: 'DELETE',
  });
  let data = await response.json();
  return data;
}

async function getAllProductsBySellerId(id) {
  let response = await fetchWithAuth(getUrl('/products?seller.id=' + id));
  let data = await response.json();
  return data;
}

export {
  getAllProducts,
  getAllProductsBySellerId,
  getProductById,
  addProduct,
  deleteProductById,
  addClickProductTracker,
  getAllCouriers,
  getAddressesById,
  addAddress,
  addOrder,
  getPaymentLists,
  addPayments,
  getOrdersByCurrentCustomer,
  getOrderDetailsById,
};
