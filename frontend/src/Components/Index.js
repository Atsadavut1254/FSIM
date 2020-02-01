import React, { Component } from "react";

class Index extends Component {
  render() {
    return (
      <React.Fragment>
          <div className="container my-5">
            <div className="row">
              <div className="col-10">
                <h3>ข้อมูลนักศึกษา</h3>
              </div>
              <div className="col">
                <button className="btn btn-danger">จัดการข้อมูล</button>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="row">
                <div className="col-12 col-lg-3" align="center">
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/mth.png"></img>
                  </button>

                  <div className="my-3">
                    <h3>Mathematic</h3>
                  </div>
                </div>
                <div className="col-12 col-lg-3" align="center">
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/chm.png"></img>
                  </button>

                  <div className="my-3">
                    <h3>Chemical</h3>
                  </div>
                </div>
                <div className="col-12 col-lg-3" align="center">
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/phy.png"></img>
                  </button>

                  <div className="my-3">
                    <h3>Physic</h3>
                  </div>
                </div>
                <div className="col-12 col-lg-3" align="center">
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/mic.png"></img>
                  </button>

                  <div className="my-3">
                    <h3>Microbiology</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "10%" }}>
              <div className="col-10">
                <h3>กิจกรรมประชาสัมพันธ์</h3>
              </div>
              <div className="col">
                <button className="btn btn-danger">จัดการข้อมูล</button>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="row bg-deeppurple">
                <div className="col-12 col-md-8">
                  <img className="banner-active" src="../img/img-1.jpg"></img>
                </div>
                <div className="col-6 col-md-4">
                  <a href="#" className="btn btn-warning btn-active">
                    การรับเข้า
                  </a>
                </div>
              </div>
              <div className="row my-5 bg-deepgreen">
                <div className="col-6 col-md-4">
                  <a href="#" className="btn btn-warning btn-active">
                    โครงการรับเข้า
                  </a>
                </div>
                <div className="col-12 col-md-8">
                  <img className="banner-active2" src="../img/img-2.jpg"></img>
                </div>
              </div>
              <div className="row my-5 bg-deepblue">
                <div className="col-12 col-md-8">
                  <img className="banner-active" src="../img/img-3.jpg"></img>
                </div>
                <div className="col-6 col-md-4">
                  <a href="#" className="btn btn-warning btn-active">
                    ประชาสัมพันธ์
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <h3>ข้อมูลศิษย์เก่า</h3>
              </div>
              <div className="col">
                <button className="btn btn-danger">จัดการข้อมูล</button>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="row">
                <div className="col-12 col-lg-4"></div>
                <div className="col-12 col-lg-4 text-center">
                  <button
                    href="#"
                    type="button"
                    id="btn-alumn"
                    className="btn btn-warning"
                  >
                    สรุปแบบสอบถาม
                  </button>
                </div>
                <div className="col-12 col-lg-4"></div>
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

export default Index;
