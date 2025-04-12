import React, { Suspense } from "react";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";
//import "../style.css";
import { ChartScript } from "../chartscript";
import ChartMain from "../chartmain";
import "../css/style.css";

export default function Dashboard() {
  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">Dashboard - Cawit Boac</h2>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-primary text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">2000</div>
                              <div className="stat-panel-title text-uppercase">
                                Population
                              </div>
                            </div>
                          </div>
                          <a href="#" className="block-anchor panel-footer">
                            Full Detail <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-success text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">300</div>
                              <div className="stat-panel-title text-uppercase">
                                Households
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-primary text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">7</div>
                              <div className="stat-panel-title text-uppercase">
                                Purok
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-info text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">300</div>
                              <div className="stat-panel-title text-uppercase">
                                Voters
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-success text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">300</div>
                              <div className="stat-panel-title text-uppercase">
                                Non-voters
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-danger text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">200</div>
                              <div className="stat-panel-title text-uppercase">
                                Issued Certificate/Clearance
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-info text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">5</div>
                              <div className="stat-panel-title text-uppercase">
                                Blotter
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-warning text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 ">212</div>
                              <div className="stat-panel-title text-uppercase">
                                Senior Citizen
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="block-anchor panel-footer text-center"
                          >
                            See All &nbsp; <i className="fa fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="panel panel-default">
                      <div className="panel-heading">Population Summary</div>
                      <div className="panel-body">
                        <div className="chart">
                          <canvas
                            id="dashReport"
                            height="310"
                            width="600"
                          ></canvas>
                        </div>
                        <div id="legendDiv"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="panel panel-default">
                      <div className="panel-heading">System Users</div>
                      <div className="panel-body">
                        <div className="alert alert-dismissible alert-success">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                          >
                            <i className="fa fa-close"></i>
                          </button>
                          <strong>Well done!</strong> You successfully read{" "}
                          <a href="#" className="alert-link">
                            this important alert message
                          </a>
                          .
                        </div>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="panel panel-default">
                      <div className="panel-heading">Population Category</div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="chart chart-doughnut">
                              <canvas
                                id="chart-area3"
                                width="1200"
                                height="900"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="panel panel-default">
                      <div className="panel-heading">Summary Gender</div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="chart chart-doughnut">
                              <canvas
                                id="chart-area4"
                                width="1200"
                                height="900"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <ChartMain />
    </>
  );
}
