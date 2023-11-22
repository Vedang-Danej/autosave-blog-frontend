import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './bootstrap.min.css';
import './App.css';
import {
  blogReducer,
  blogsReducer,
  deleteBlogReducer,
  newBlogReducer,
  updateBlogReducer,
} from './store/reducers/blogReducers';

// redux state initialization

const store = configureStore({
  reducer: {
    allBlogs: blogsReducer,
    blog: blogReducer,
    newBlog: newBlogReducer,
    deleteBlog: deleteBlogReducer,
    updateBlog: updateBlogReducer,
  },
  middleware: [thunk],
  devTools: true,
  preloadedState: {},
});

const baseURL = 'https://autosave-blog-api.fly.dev/api/blog';
axios.interceptors.request.use(
  (config) => {
    config.url = baseURL + config.url;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
