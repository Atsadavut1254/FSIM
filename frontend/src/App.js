import React, { Component } from "react";
import "./App.css";

// import Route Tool
import { Route } from "react-router-dom";

import Header from "./Components/header";
import Footer from "./Components/footer";
import Index from "./Components/Index";
import Login from "./Components/Login";
import StudentForm from "./Components/StudentForm";
import AddStudent from "./Components/add_student";

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
            <Route exact path="/add-new-student" component={AddStudent} />

            {/* <Route exact path="/MTH" component={Mthpopup} /> */}
          </switch>
          <Footer />
        </div>
      </body>
    </React.Fragment>
  );
}

export default App;
