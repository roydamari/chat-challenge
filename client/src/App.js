import React, { useState } from 'react'
import Login from './components/Login';
import Chat from './components/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [id, setId] = useState();
  const [name, setName] = useState();


  return (
    <Router>
      <Switch>
        <Route path='/:room'>
          {id ? <Chat id={id} name={name} /> : <Login setId={setId} setName={setName} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
