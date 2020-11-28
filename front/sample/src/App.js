import React, { useState, useEffect } from 'react';
import {HashRouter as Router,Switch,Route,Link,useLocation,useHistory} from "react-router-dom"
import {Login} from './Login'
import {Home} from './Home'
import {getCookie} from './util'
import {Header} from './Header'

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
              {!getCookie("_id") && <Route path="/" exact component={props => <Login data={{location, history, setConnected}}/>} />}
              {getCookie("_id") && <>
              <Header data={{setConnected}}/>
                <Route path="/" exact component={props => <Home data={{location, history}}/>} />
              </>}
            </React.Fragment>
        )}
        />
      </Router>
    </div>
  );
}

export default App;
