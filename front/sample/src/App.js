import React, { useState, useEffect } from 'react';
import {HashRouter as Router,Switch,Route,Link,useLocation,useHistory} from "react-router-dom"
import {Container} from 'react-bootstrap'
import {Login} from './Login'
import {Home} from './Home'
import {getCookie} from './util'
import {Header} from './Header'
import {Cart} from './Cart'
import {Fav} from './Fav'

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
                <Route path="/cart" exact component={props => <Cart data={{location, history}}/>} />
                <Route path="/fav" exact component={props => <Fav data={{location, history}}/>} />
              </>}
            </React.Fragment>
        )}
        />
      </Router>
    </div>
  );
}

export default App;
