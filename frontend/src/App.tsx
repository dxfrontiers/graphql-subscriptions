import React from 'react';
import {Post} from "./components/post"

function App() {
  return (
      <div>
        <Post post={

          {
            id: "123",
            user: {username: "alfons", displayName: "Alfons User"},
            message: "this is my most important message of the day!",
            postedAt: "1h"
          }
          
        }></Post>
      </div>
  );
}

export default App;
