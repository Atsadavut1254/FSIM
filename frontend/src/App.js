import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// import Api
import ApiManage from "./Class/ApiManage";


//import Main Page
import Home from "./Components/Index/Home";
import Navbar from "./Components/Menu";
import Login from "./Components/Login";
<<<<<<< HEAD
=======

//import Admin Page
import MainAdmin from "./Components/Admin/MainAdmin/MainAdmission";

//import User Page
import Active from "./Components/User/ActiveRecruitment";
import Admission from "./Components/User/Admission";
import Alumni from "./Components/User/Alumni";
import Activity from "./Components/User/Activity";
>>>>>>> master

//import Admin Page

//import User Page
import Active from "./Components/User/ActiveRecruitment";


<<<<<<< HEAD

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    ApiManage.get("admission/2560/1/1")
      .then(res => {
        let receive_data = res.data;
        if (receive_data.response === true) {
          this.setState({
            data: receive_data.data
          });
        }
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }
=======
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  // componentDidMount() {
  //   ApiManage.get("admission/2560/1/1")
  //     .then(res => {
  //       let receive_data = res.data;
  //       if (receive_data.response === true) {
  //         this.setState({
  //           data: receive_data.data
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Error fetching and parsing data", error);
  //     });
  // }
>>>>>>> master
  render() {
    // let { data } = this.state;
    return (
      <React.Fragment>
        <Navbar/>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>

            {/* Route for admin */}
<<<<<<< HEAD


            {/* Route for user */}
            <Route exact path="/active" component={Active}/>

=======
            <Route exact path="/admin" component={MainAdmin} />

            {/* Route for user */}
            <Route exact path="/active" component={Active}/>
            <Route exact path="/admission" component={Admission} />
            <Route exact path="/alumni" component={Alumni}/>
            <Route exact path="/activity" component={Activity} />
>>>>>>> master
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
