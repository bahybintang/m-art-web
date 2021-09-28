import { fetchWithAuth } from './Auth';
import Config from '../config';

function getUrl(path) {
  return Config.API_URL + path;
}

async function getAllProducts() {
  let response = await fetchWithAuth(getUrl('/products'));
  let data = await response.json();
  return data;
}

async function getAllProductsBySellerId(id) {
  let response = await fetchWithAuth(getUrl('/products?seller.id=' + id));
  let data = await response.json();
  return data;
}

export { getAllProducts, getAllProductsBySellerId };
