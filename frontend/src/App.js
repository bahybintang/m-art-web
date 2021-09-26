import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './layouts/home/Home.js';
import Login from './layouts/login/Login.js';
import Register from './layouts/register/Register.js';

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
