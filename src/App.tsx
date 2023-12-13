import { useState, useEffect } from 'react';
import './App.css'; // Import your stylesheet
import axios from 'axios';

// Define the structure of a Post
interface Post {
  title: string;
  link: string;
  id: number;
}

// Define the structure of a Page
interface Page {
  title: string;
  content: string;
}

function App() {
  // State to store the retrieved posts from the WordPress API
  const [posts, setPosts] = useState<Post[]>();
  // State to store the retrieved page from the WordPress API
  const [page, setPage] = useState<Page>();

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/posts")
      .then(results => {
        let newPosts = [];
        for (let i = 0; i < results.data.length; i++) {
          const newPost: Post = {
            id: results.data[i].id,
            link: results.data[i].link,
            title: results.data[i].title.rendered
          }
          newPosts.push(newPost);
        }
        setPosts(newPosts);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // useEffect to fetch a specific page when the component mounts
  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/pages/2")
      .then(results => {
        const newPage: Page = {
          title: results.data.title.rendered,
          content: results.data.content.rendered
        }
        setPage(newPage);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // useEffect to fetch another specific page when the component mounts
  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/pages/1")
      .then(results => {
        const newPage: Page = {
          title: results.data.title.rendered,
          content: results.data.content.rendered
        }
        setPage(newPage);
        console.log(newPage);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Render the component
  return (
    <div className="container">
      <h1>Headless Wordpress with React and Typescript</h1>
      <p>by <a href="https://matthewgruman.com">Matthew Gruman</a></p>

      {/* Display the title and content of the retrieved page */}
      <h2>{page && page.title}</h2>
      <div dangerouslySetInnerHTML={page && { __html: page.content }} />

      {/* Display the list of retrieved posts */}
      <h2>Posts</h2>
      <p>This is a mapping of my latest posts.</p>
      <ul>
        {
          posts &&
          posts.map(item => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
