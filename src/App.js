import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import { Route } from './components';

import {
  Login,
  Dashboard,
} from './pages';

export default function App() {

  return (
    <ConfigProvider locale={ptBR}>
      <Router>
        <Switch>
          <Route.Custom path="/login" component={Login} />
          <Route.Private path="/" component={Dashboard} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
} 