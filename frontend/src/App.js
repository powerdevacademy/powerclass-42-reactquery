import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';

import Welcome from './pages/Welcome';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';

const routes = [
  {
      path: '/login',
      component: Login,
      key: 'login',
      exact: true
  },
  {
      path: '/cadastro',
      component: Signup,
      key: 'cadastro',
      exact: true
  },
  {
      path: '/profile',
      component: RequireAuth(Profile),
      key: 'profile',
      exact: true
  },
  {
      path: '/list',
      component: RequireAuth(TaskList),
      key: 'list',
      exact: true
  },
  {
      path: '/welcome',
      component: Welcome,
      key: 'welcome',
      exact: true
  },
  {
      path: '/',
      component: () => <Redirect to="/welcome" />,
      key: 'root',
      exact: false
  }
];

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm">
        <Switch>
          {routes.map(route => <Route exact={route.exact} path={route.path} component={route.component} key={route.key} />)}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
