function saveCurrentOrder(id) {
  let newOrders = [...getCurrentOrder(), id];
  return localStorage.setItem('orders', JSON.stringify(newOrders));
}

function getCurrentOrder() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

function clearCurrentOrder() {
  localStorage.removeItem('orders');
}

export { saveCurrentOrder, getCurrentOrder, clearCurrentOrder };
