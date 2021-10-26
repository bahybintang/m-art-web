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
};
