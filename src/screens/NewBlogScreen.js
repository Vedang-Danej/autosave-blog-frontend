import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { newBlog } from '../store/actions/blogActions';
import { useNavigate } from 'react-router';

const NewBlogScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (title && author && blogContent) {
      dispatch(newBlog(title, author, blogContent));
      // clearing all the feilds of the form after submitting a new form
      // and redirecting to the home page

      setTitle('');
      setAuthor('');
      setBlogContent('');
      navigate('/');
    }
  };

  return (
    <>
      <h2 className="text-center heading-text">Create New Blog</h2>
      <Form onSubmit={submitHandler} className="new-blog-form">
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
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
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
      </Form>
    </>
  );
};

export default NewBlogScreen;
