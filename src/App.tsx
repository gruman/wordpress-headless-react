import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, ListGroup } from 'react-bootstrap';

import axios from 'axios';

interface Post {
  title: string;
  link: string;
  id: number;
}

function App() {

  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/posts")
      .then(results => {
        let newPosts = [];
        for (let i = 0; i < results.data.length; i++) {
          const newPost : Post = {
            id: results.data[i].id,
            link: results.data[i].link,
            title: results.data[i].title.rendered
          }
          newPosts.push(newPost);
        }
        console.log(newPosts)
        setPosts(newPosts)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <Container>
      <h1>Headless Wordpress</h1>
      <p>by <a href="https://matthewgruman.com">Matthew Gruman</a></p>
      <h2>Posts</h2>
      <ListGroup>
        {
          posts &&
          posts.map(item => {
            return (
              <ListGroup.Item key={item.id}>
                <a href={item.link}>{item.title}</a>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </Container>
  );
}

export default App;
