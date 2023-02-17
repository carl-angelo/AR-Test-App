import React from 'react';
import './App.scss';
import loadable from '@loadable/component';
import { Route, BrowserRouter, useRoutes } from 'react-router-dom';

const Login = loadable(() => import('./pages/Login'));
const Home = loadable(() => import('./pages/Home'));
// const ErrorPage = loadable(() => import('./pages/Error'));

const AppRoute = () => {
  let routes = useRoutes([
    {
      path: '/', element: <Home />
    },
    {
      path: '/login', element: <Login />
    }
  ]);
  return routes;
}

const App: React.FC<EmptyObject> = () => {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter> 
  );
};

export default App;
