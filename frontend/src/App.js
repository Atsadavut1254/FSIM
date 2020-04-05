import React, { Component, Fragment } from 'react';
import './App.css';

// router
import {Route, Switch} from 'react-router-dom'

// general component
import Navbar from './components/general/Menu'
import Home from './components/layouts/Home'


// user component
import Admission from "./components/layouts/user/Admission";
import ActiveRecruitment from "./components/layouts/user/ActiveRecruitment";
import Alumni from "./components/layouts/user/Alumni";
import ActivityInformation from "./components/layouts/user/ActivityInformation";

import DepartmentDetail from './components/layouts/user/DepartmentDetail'

// admin component
import AdminHome from "./components/layouts/admin/Home";
import AdminHomeGeneral from "./components/layouts/admin/HomeGeneral";
import AdminActivity from "./components/layouts/admin/Activity";
import AdminNewStudent from "./components/layouts/admin/NewStudent"
import AlumniManage from './components/layouts/admin/AlumiManage';

class App extends Component {
  render() {
    return (
        <Fragment>
          <Navbar/>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/admission" component={Admission}/>
              <Route exact path="/active" component={ActiveRecruitment}/>
              <Route exact path="/alumni" component={Alumni}/>
              <Route exact path="/activity" component={ActivityInformation}/>

              <Route path="/department/:dept_id" component={DepartmentDetail} />

              {/*    admin    */}
              <Route exact path="/admin" component={AdminHome}/>
              <Route exact path="/adminGeneral" component={AdminHomeGeneral}/>
              <Route exact path="/admin/activity" component={AdminActivity} />
              <Route exact path="/admin/alumni" component={AlumniManage} />
              <Route exact path="/admin/newstudent" component={AdminNewStudent} />
            </Switch>
          </div>
        </Fragment>
    )
  }
}

export default App;
