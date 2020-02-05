import React from "react";

function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-yellow navbar-fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="logo" src="../img/logo-fsci2.png"></img>
          </a>
          {/* <a className="navbar-brand" href="#"><span className="logo">FSIM</span></a> */}
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> */}
          {/* <span className="navbar-toggler-icon"></span>
            </button> */}
          <div className="navbar-collapse0" id="navbarNav">
            <ul className="navbar-nav ">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  <i class="fa fa-home" aria-hidden="true"></i>หน้าหลัก{" "}
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  ข้อมูลนักศึกษา
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  กิจกรรมประชาสัมพันธ์นักศึกษา
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#">
                  ข้อมูลศิษย์เก่า
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="carousel-inner">
        <div className="text-banner">
          WELCOME TO <br /> FSci Information Management System
        </div>
        <img
          src="../img/banner2.png"
          className="d-block w-100"
          height="300px"
        ></img>
      </div>
    </React.Fragment>
  );
}
export default Header;
