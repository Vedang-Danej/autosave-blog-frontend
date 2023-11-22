import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
