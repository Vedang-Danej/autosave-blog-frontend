import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DeleteButton from './DeleteButon';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../store/actions/blogActions';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  // converting the mongoDB date format into DD/MM/YYYY
  const d = new Date(blog.updatedAt);
  const blogDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

  const dispatch = useDispatch();

  // Delete Handler to delte a single Blog
  const deleteHandler = () => {
    dispatch(deleteBlog(blog._id));
  };

  return (
    <Card className="blog-style">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          by {blog.author} on {blogDate}
        </Card.Subtitle>
        <Card.Text>
          {blog.blogContent.substring(0, 300) + '......'}
          <Link className="full-blog-button" to={`/blog/${blog._id}`}>
            Read Full Blog
          </Link>
        </Card.Text>
        <LinkContainer to={`/${blog._id}`}>
          <Button variant="secondary">Edit</Button>
        </LinkContainer>{' '}
        <DeleteButton deleteHandler={deleteHandler} />
      </Card.Body>
    </Card>
  );
};

export default Blog;
