import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { getOneBlog, updateBlog } from '../store/actions/blogActions';
import Loader from '../Components/Loader';

const EditBlogScreen = () => {
  // states for the feilds in the edit form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [blogContent, setBlogContent] = useState('');

  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogState = useSelector((state) => state.blog);
  const { blog, loading, success } = blogState;

  // state for when the autosave has been successfull, the 'updated' message
  // only shows in this value is true
  const [updated, setUpdated] = useState(false);

  // logic for implementation of the autosave feature
  // -> checks for a state change every 10 seconds
  // -> if a state change is found in either author, title or Content
  //    a put request is sent to the server and 'updated' message is shown
  //    in the UI

  const counter = useRef(0);
  const [timerState, setTimerState] = useState({ num: 0 });
  useEffect(() => {
    if (counter.current < 10) {
      counter.current += 1;
      const timer = setTimeout(() => setTimerState({ num: timerState.num + 1 }), 1000);

      return () => clearTimeout(timer);
    } else {
      counter.current = 0;
      setTimerState({ num: 0 });

      // checking for any change in the states
      if (
        title &&
        blogContent &&
        author &&
        (title !== blog.title || blogContent !== blog.blogContent || author !== blog.author)
      ) {
        dispatch(updateBlog(id, title, author, blogContent));

        // logic to display the 'updated' message to the user for 1 second
        setUpdated(true);
        setTimeout(() => setUpdated(false), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState]);

  useEffect(() => {
    // getting the blog to be updated into the form feilds

    if (!blog || blog._id !== id) dispatch(getOneBlog(id));
    else {
      setTitle(blog.title);
      setAuthor(blog.author);
      setBlogContent(blog.blogContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog, id, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // submitting the form and updating the blog and redirecting to the Home Page
    dispatch(updateBlog(id, title, author, blogContent));
    navigate('/');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        success && (
          <>
            <h2 className="text-center heading-text">Edit Blog</h2>

            <Form onSubmit={onSubmitHandler} className="new-blog-form">
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  type="text"
                  placeholder="Enter the title of the Blog"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  type="text"
                  placeholder="Your Name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Blog Content</Form.Label>
                <Form.Control
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  required
                  as="textarea"
                  rows={6}
                  placeholder="Content of the blog"
                />
              </Form.Group>

              <LinkContainer to="/">
                <Button className="form-button" size="lg" variant="info">
                  Back
                </Button>
              </LinkContainer>
              <Button type="submit" className="form-button" size="lg" variant="primary">
                Submit
              </Button>
              <section className="update-alert">
                {updated ? (
                  <p className="update-info">{updated ? 'Updated!' : ' '}</p>
                ) : (
                  <p className="update-info">
                    <Spinner
                      className="update-spinner"
                      size="sm"
                      animation="border"
                      variant="dark"
                    />{' '}
                    Checking for Changes and Updating in {10 - timerState.num} seconds{' '}
                  </p>
                )}
              </section>
            </Form>
          </>
        )
      )}
    </>
  );
};

export default EditBlogScreen;
