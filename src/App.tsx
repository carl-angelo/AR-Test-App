import React from 'react';
import './App.scss';
import loadable from '@loadable/component';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/store';
import Header from './components/Header';
import Error from './components/Error';

const Login = loadable(() => import('./pages/Login/Login'));
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
   <Provider store={store}>
    <BrowserRouter>
      <Header />
      <AppRoute />
      <Error />
    </BrowserRouter> 
   </Provider>
  );
};

export default App;
