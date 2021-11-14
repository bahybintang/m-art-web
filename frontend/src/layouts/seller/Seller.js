import { withAuthSeller } from '../../helpers/Auth';
import Sidebar from './Sidebar.tsx';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import MyProducts from './MyProducts';
import Profile from './Profile';
import AddProduct from './AddProduct';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import Order from './Order';
import OrderDetail from './OrderDetail';

function Seller(props) {
  return (
    <Sidebar>
      <Switch>
        <Route path="/seller/checkout" component={Checkout} />
        <Route path="/seller/cart" component={Cart} />
        <Route path="/seller/order/:id" component={OrderDetail} />
        <Route path="/seller/order" component={Order} />
        <Route path="/seller/products/add" component={AddProduct} />
        <Route path="/seller/products/:id" component={ProductDetail} />
        <Route path="/seller/products" component={MyProducts} />
        <Route path="/seller/profile" component={Profile} />
        <Route path="/seller" component={Home} />
      </Switch>
    </Sidebar>
  );
}

export default withAuthSeller(Seller);
