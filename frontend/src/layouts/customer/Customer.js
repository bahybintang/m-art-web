import { withAuthCustomer } from '../../helpers/Auth';
import Sidebar from './Sidebar.tsx';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';

function Customer(props) {
  return (
    <Sidebar>
      <Switch>
        <Route path="/customer/checkout" component={Checkout} />
        <Route path="/customer/cart" component={Cart} />
        <Route path="/customer/products/:id" component={ProductDetail} />
        <Route path="/customer/profile" component={Profile} />
        <Route path="/customer" component={Home} />
      </Switch>
    </Sidebar>
  );
}

export default withAuthCustomer(Customer);
