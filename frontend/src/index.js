import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { RouterProvider } from 'react-router-dom';
import router from './routes/index'
import { Provider } from 'react-redux'
import {store} from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>

    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


