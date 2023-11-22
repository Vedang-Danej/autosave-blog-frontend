import axios from 'axios';
import * as actionTypes from './actionTypes';

// fetching all the blogs for the home page

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_BLOGS_REQUEST,
    });
    const { data } = await axios.get('/');
    dispatch({
      type: actionTypes.GET_ALL_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_BLOGS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// fetching a single blog

export const getOneBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ONE_BLOG_REQUEST,
    });
    const { data } = await axios.get(`/${id}`);
    dispatch({
      type: actionTypes.GET_ONE_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// submitting a new blog to the server

export const newBlog = (title, author, blogContent) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.NEW_BLOG_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const blog = {
      blogContent,
      author,
      title,
    };
    const { data } = await axios.post(`/`, blog, config);
    dispatch({
      type: actionTypes.NEW_BLOG_SUCCESS,
      payload: data,
    });

    // adding the newly created blog to the list of all blogs, if not done the home
    // page will not display the new blog
    dispatch({
      type: actionTypes.ADD_NEW_BLOG_TO_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.NEW_BLOG_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateBlog = (id, updatedTitle, updatedAuthor, updatedContent) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UPDATE_BLOG_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const blog = {
      updatedTitle,
      updatedAuthor,
      updatedContent,
    };
    const { data } = await axios.put(`/${id}`, blog, config);
    dispatch({
      type: actionTypes.UPDATE_BLOG_SUCCESS,
      payload: data,
    });

    // Updating the edited blog in the list of all blogs, so the homepage displays
    // the new blog details
    dispatch({
      type: actionTypes.UPDATE_BLOG_IN_LIST,
      payload: { id, data },
    });

    // changing the value of the current blog to the new edited blog
    dispatch({
      type: actionTypes.REFRESH_BLOG_STATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// deleting a single blog

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await axios.delete(`/${id}`);
    dispatch({
      type: actionTypes.DELETE_BLOG_SUCCESS,
      payload: id,
    });
    dispatch({
      type: actionTypes.DELETE_BLOG_FROM_LIST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
