import * as actionTypes from '../actions/actionTypes';
export const blogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BLOGS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_BLOGS_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case actionTypes.GET_ALL_BLOGS_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ADD_NEW_BLOG_TO_LIST:
      return { ...state, blogs: [...state.blogs, action.payload] };
    case actionTypes.DELETE_BLOG_FROM_LIST:
      // filtering the deleted blog out of the list of all blogs in the state
      return { ...state, blogs: state.blogs.filter((blog) => blog._id !== action.payload) };
    case actionTypes.UPDATE_BLOG_IN_LIST:
      // changing the value of the old blog with the edited blog at the same index, so
      // that the position of the blog does not change in the blogs array
      const old_blog = state.blogs.find((blog) => blog._id === action.payload.id);
      const index_of_blog = state.blogs.indexOf(old_blog);
      const new_blogs = state.blogs;
      new_blogs[index_of_blog] = action.payload.data;
      return { ...state, blogs: new_blogs };
    default:
      return state;
  }
};

export const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ONE_BLOG_REQUEST:
      return { ...state, loading: true };
    case actionTypes.GET_ONE_BLOG_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case actionTypes.GET_ONE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.REFRESH_BLOG_STATE:
      return { ...state, blog: action.payload };
    default:
      return state;
  }
};

export const newBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEW_BLOG_REQUEST:
      return { ...state, loading: true };
    case actionTypes.NEW_BLOG_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case actionTypes.NEW_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BLOG_REQUEST:
      return { ...state, loading: true };
    case actionTypes.UPDATE_BLOG_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case actionTypes.UPDATE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_BLOG_SUCCESS:
      return { ...state, success: true, deletedBlogID: action.payload };
    case actionTypes.DELETE_BLOG_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
