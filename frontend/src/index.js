import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Book from './pages/Book';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundrary';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<Root />} errorElement={<ErrorBoundary />}>
      <Route path='books/:bookId' element={<Book />} ></Route>
      <Route path='' element={<Home />} ></Route>
    </Route>,
  ])
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
