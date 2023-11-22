import HomeScreen from './screens/HomeScreen';
import { Route, Routes } from 'react-router-dom';
import NewBlogScreen from './screens/NewBlogScreen';
import EditBlogScreen from './screens/EditBlogScreen';
import FullBlog from './Components/FullBlog';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/newblog" element={<NewBlogScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="blog/:id" element={<FullBlog />} />
        <Route path="/:id" element={<EditBlogScreen />} />
      </Routes>
    </div>
  );
};

export default App;
