import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './layouts/home/Home.js';
import Login from './layouts/login/Login.js';
import Register from './layouts/register/Register.js';
import Customer from './layouts/customer/Customer';
import Seller from './layouts/seller/Seller';
import Payment from './layouts/payment/Payment';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/seller">
            <Seller />
          </Route>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/pay">
            <Payment />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
