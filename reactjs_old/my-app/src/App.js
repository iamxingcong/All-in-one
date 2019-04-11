
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
 
import Home from './Home';
import Detail from './Detail';
import News from './News';
function Index() {
  return <Home />;
 
	return(
	      <div>
		  <News />
	      </div>
      );	


 
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


	
class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
	       <Route path="/detail/:id" component={Detail} />
      </div>
    </Router>
    );
  }
}

export default App;
