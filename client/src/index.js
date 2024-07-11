import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/Create';
import BlogList from './pages/BlogList'
import AuthorDetails from './pages/AuthorDetails';
import AuthorList from './pages/AuthorList';
import EditProfile from './pages/EditProfile';
import UserProvider from './context/userContext';

const router = createBrowserRouter([

  {
    path: '/', element:
      <UserProvider><Layout /></UserProvider>
    , errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "create", element: <Create /> },
      { path: "blogs", element: <BlogList /> },
      { path: "authors", element: <AuthorList /> },
      { path: "author/:id", element: <AuthorDetails /> },
      { path: "profile/:id", element: <EditProfile /> },
      { path: "edit/:id", element: <Create /> },
    ]
  }
])





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

