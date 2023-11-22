import React from 'react';
import BlogScreen from './BlogScreen';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <h2 className="text-center heading-text">Autosave Blog</h2>
      <LinkContainer to="/newblog">
        <Button className="new-blog-button" variant="primary" size="lg">
          Create New Blog
        </Button>
      </LinkContainer>
      <BlogScreen />
    </>
  );
};

export default HomeScreen;
