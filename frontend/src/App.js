import React, { Component } from "react";
import "./App.css";

// import Route Tool
import { Route } from "react-router-dom";

import Header from "./Components/header";
import Footer from "./Components/footer";
import Index from "./Components/Index";
import Login from "./Components/Login";
import StudentForm from "./Components/StudentForm";
import add_student from "./Components/admin/add_student";
import add_activity from "./Components/admin/add_activity";
import add_project from "./Components/admin/AddProject";

// import Mthpopup from "./Components/Mthpopup";


const Home = () => <h1>HOME</h1>;
const About = () => <h1>About</h1>;

// export class Index extends Component{
//   constructor(props){
//     super(props);
//     this.state ={Index:[]}
//   })
// }

function App() {

  return (
    <React.Fragment>
      <body>
        <div className="App">
          <Header />
          <switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/std" component={StudentForm} />
            <Route exact path="/add_student" component={add_student} />
            <Route exact path="/add_activity" component={add_activity} />
            <Route exact path="/add_project" component={add_project} />

            
            {/* <Route exact path="/MTH" component={Mthpopup} /> */}
          </switch>
          <Footer />
        </div>
      </body>
    </React.Fragment>
  );
}

export default App;
