import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Route Tool
import { Route } from 'react-router-dom'

import StudentForm from './Components/StudentForm'

const Home = () => <h1>HOME</h1>
const About = () => <h1>About</h1>

function App() {
  return (
      <React.Fragment>
          <div className="App">
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/std" component={StudentForm} />
          </div>
      </React.Fragment>
  );
}

export default App;
