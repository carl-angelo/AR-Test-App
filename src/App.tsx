import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import { store } from './core/store';

const App: React.FC<EmptyObject> = () => {
  return <Provider store={store}>
    My App
  </Provider>;
};

export default App;
