import React, { useState, useEffect } from 'react';
import {HashRouter as Router,Switch,Route,Link,useLocation,useHistory} from "react-router-dom"
import {Login} from './Login'
import {getCookie} from './util'

function App() {
  const[connected, setConnected] = useState(null)

  useEffect(() => {
    document.title = "Projet Microservices"
 }, []);

  return (
    <div className="App">
      <Router basename={'/'}>
      <Route render={({ location, history }) => (
            <React.Fragment>
              {!getCookie("id") && <Route path="/" exact component={props => <Login data={{location, history, setConnected}}/>} />}
            </React.Fragment>
        )}
        />
      </Router>
    </div>
  );
}

export default App;
