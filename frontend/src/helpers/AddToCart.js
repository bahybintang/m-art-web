function saveToLocal(key, item) {
  return localStorage.setItem(key, JSON.stringify(item));
}

function getDataFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToCart(product, qty = 1) {
  product = { ...product, qty };
  var products = getCart();
  if (products == null) {
    products = [product];
    saveToLocal('cart', products);
    return products;
  }

  products.push(product);
  saveToLocal('cart', products);
}

function deleteProduct(idProduct) {
  var products = getCart();
  if (products == null) return null;

  products = products.filter(function (obj) {
    return obj.id !== idProduct;
  });
  return saveToLocal('cart', products);
}

function getCart() {
  return getDataFromLocal('cart');
}

function emptyCart() {
  localStorage.removeItem('cart');
}

export { addToCart, getCart, deleteProduct, emptyCart };
