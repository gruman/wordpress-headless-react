import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface Post {
  title: string;
  link: string;
  id: number;
}

interface Page {
  title: string;
  content: string;
}

function App() {

  const [posts, setPosts] = useState<Post[]>();
  const [page, setPage] = useState<Page>();


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
        setPosts(newPosts)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/pages/2")
      .then(results => {
        const newPage : Page = {
          title: results.data.title.rendered,
          content: results.data.content.rendered
        }
        setPage(newPage)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get("https://wordpress.matthewgruman.com/wp-json/wp/v2/page/1")
      .then(results => {
        const newPage : Page = {
          title: results.data[0].title.rendered,
          content: results.data[0].content.rendered
        }
        setPage(newPage);
        console.log(newPage)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <h1>Headless Wordpress with React</h1>
      <p>by <a href="https://matthewgruman.com">Matthew Gruman</a></p>

      <h3>{page && page.title}</h3>
      <div dangerouslySetInnerHTML={page && { __html: page.content }} />
      <h2>Posts</h2>
      <ul>
        {
          posts &&
          posts.map(item => {
            return (
              <li key={item.id}>
                <a href={item.link}>{item.title}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
