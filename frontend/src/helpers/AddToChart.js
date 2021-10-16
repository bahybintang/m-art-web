function saveToLocal(key, item) {
  return localStorage.setItem(key, JSON.stringify(item));
}

function getDataFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToChart(product) {
  var products = getChart();
  if (products == null) {
    products = [product];
    saveToLocal('chart', products);
    return products;
  }

  products.push(product);
  saveToLocal('chart', products);
}

function deleteProduct(idProduct) {
  var products = getChart();
  if (products == null) return null;

  products = products.filter(function (obj) {
    return obj.id !== idProduct;
  });
  return saveToLocal('chart', products);
}

function getChart() {
  return getDataFromLocal('chart');
}

function emptyChart() {
  localStorage.removeItem('chart');
}

export {
  addToChart,
  getChart,
  deleteProduct,
  emptyChart,
};
