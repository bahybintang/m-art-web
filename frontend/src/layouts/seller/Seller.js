import { withAuthSeller } from '../../helpers/Auth';
import Sidebar from './Sidebar.tsx';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import MyProducts from './MyProducts';
import Profile from './Profile';

function Seller(props) {
  return (
    <Sidebar>
      <Switch>
        <Route path="/seller/products" component={MyProducts} />
        <Route path="/seller/profile" component={Profile} />
        <Route path="/seller" component={Home} />
      </Switch>
    </Sidebar>
  );
}

export default withAuthSeller(Seller);
