import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import News from './News';
import Detail from './Detail';
import About from  './About';

function Index() {
 
    return(
      <div>
         
          <News />
      </div>
      );
 
}

function Aabout() {
  return (<About />);
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
              <Link to="/about/">Aabout</Link>
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
