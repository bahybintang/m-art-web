import { withAuthCustomer } from '../../helpers/Auth';
import Sidebar from './Sidebar.tsx';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

function Customer(props) {
  return (
    <Sidebar>
      <Switch>
        <Route path="/customer/profile" component={Profile} />
        <Route path="/customer" component={Home} />
      </Switch>
    </Sidebar>
  );
}

export default withAuthCustomer(Customer);
