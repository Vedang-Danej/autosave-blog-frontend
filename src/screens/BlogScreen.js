import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../store/actions/blogActions';
import Blog from '../Components/Blog';
import { useEffect } from 'react';
import Loader from '../Components/Loader';

const BlogScreen = () => {
  const dispatch = useDispatch();

  const allblogs = useSelector((state) => state.allBlogs);
  const { blogs, loading, success } = allblogs;

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        success && blogs && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)
      )}
    </>
  );
};

export default BlogScreen;
