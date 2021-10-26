function saveToLocal(key, item) {
  return localStorage.setItem(key, JSON.stringify(item));
}

function getDataFromLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

function addToCart(product, qty = 1) {
  product = { ...product, qty };
  var products = getDataFromLocal('cart');
  var curProdQty = !!products[product.id] ? products[product.id].qty : 0;
  saveToLocal('cart', {
    ...products,
    [product.id]: {
      ...product,
      qty: curProdQty + product.qty,
      stock: product.stock - (curProdQty + product.qty),
    },
  });
}

function deleteProduct(idProduct) {
  var products = getDataFromLocal('cart');
  delete products[idProduct];
  return saveToLocal('cart', products);
}

function getCart() {
  let carts = getDataFromLocal('cart');
  let arrayCart = Object.values(carts);
  return arrayCart;
}

function emptyCart() {
  localStorage.removeItem('cart');
}

export { addToCart, getCart, deleteProduct, emptyCart };
