import React from 'react';
import logo from './logo.svg';
import './App.css';
import fsci from './img/60year-fsci.png'

// import Route Tool
import { Route } from 'react-router-dom'

import StudentForm from './Components/StudentForm'

const Home = () => <h1>HOME</h1>
const About = () => <h1>About</h1>

function App() {
  return (
      <React.Fragment>
          <div className="App">
              <h1>NEW BUILD</h1>
              <img src={fsci} width="100px"/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/std" component={StudentForm} />
          </div>
      </React.Fragment>
  );
}

export default App;
