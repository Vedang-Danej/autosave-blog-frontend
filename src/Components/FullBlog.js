import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Card } from 'react-bootstrap';
import { getOneBlog } from '../store/actions/blogActions';
import Loader from '../Components/Loader';

const FullBlog = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [blogDate, setBlogDate] = useState('');

  const blogState = useSelector((state) => state.blog);
  const { blog, loading, success } = blogState;

  useEffect(() => {
    dispatch(getOneBlog(id));
    // setting the blog date only when the blog in n the state
    if (blog) {
      const d = new Date(blog.updatedAt);
      setBlogDate(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, success, blogDate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        success && (
          <>
            <Card className="full-blog-style">
              <Card.Body>
                <Card.Title className="full-blog-title">{blog.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted full-blog-subtitle">
                  by {blog.author} on {blogDate}
                </Card.Subtitle>
                <Card.Text>{blog.blogContent}</Card.Text>
              </Card.Body>
            </Card>
            <LinkContainer to="/">
              <Button className="new-blog-button" variant="outline-secondary" size="lg">
                Back
              </Button>
            </LinkContainer>
          </>
        )
      )}
    </>
  );
};

export default FullBlog;
