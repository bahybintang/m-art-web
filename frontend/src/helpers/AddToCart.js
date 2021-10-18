function saveToLocal(key, item) {
  return localStorage.setItem(key, JSON.stringify(item));
}

function getDataFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToCart(product) {
  var products = getCart();
  if (products == null) {
    products = [product];
    saveToLocal('chart', products);
    return products;
  }

  products.push(product);
  saveToLocal('chart', products);
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
  return getDataFromLocal('chart');
}

function emptyCart() {
  localStorage.removeItem('chart');
}

export {
  addToCart,
  getCart,
  deleteProduct,
  emptyCart,
};
