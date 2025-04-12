import React from "react";
import "../style.css";
import Header from "../header";
import Navs from "../nav";
import Footer from "../footer";

export default function PhysicalChar() {
  return (
    <>
      <div className="ts-main-content">
        <Header />
        <Navs />
        <div className="content-wrapper">
          <div className="container-fluid">
            <header>
              <h1 className="h3 display">I. PHYSICAL CHARACTERISTICS </h1>
            </header>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group col-md-6">
                      <label>
                        <b>A. classNameification:</b>
                      </label>
                      <select
                        name="classNameificationl"
                        id="t1"
                        className="form-control"
                      >
                        <option>Rural</option>
                        <option>Urban</option>
                      </select>
                      <label>
                        <b>B. Number of Purok/Sitios:</b>
                      </label>
                      <input
                        type="number"
                        id="t2"
                        placeholder="No of Purok/Sitios"
                        className="form-control"
                      />

                      <label>
                        <b>C. Land Area:</b>
                      </label>

                      <div class="input-group ">
                        <span class="input-group-addon">Type:</span>

                        <input
                          name="type"
                          type="text"
                          placeholder="type"
                          id="t3"
                          className="form-control"
                        />
                        <span class="input-group-addon">Area:</span>
                        <input
                          name="area"
                          type="number"
                          placeholder="Total Area(hectares)"
                          id="t4"
                          className="form-control"
                        />
                        <div class="input-group-btn">
                          <button
                            type="button"
                            title="Clear selected files"
                            class="btn btn-primary fileinput-remove fileinput-remove-button"
                          >
                            <i class="glyphicon glyphicon-save"></i> Add Data
                          </button>
                        </div>
                      </div>
                    </div>

                    <br />
                    <div className="col-md-10">
                      <div className="panel panel-default">
                        <div className="panel-heading">Land Area Table</div>
                        <div className="panel-body">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Type</th>
                                <th>Total Area(hectares)</th>
                                <th width="100px">Action</th>
                              </tr>
                            </thead>
                            <tbody id="tbl_landarea">
                              <tr>
                                <td> </td>
                                <td> </td>
                                <td>
                                  <button className="btn btn-danger btn-sm">
                                    <i className="fa fa-trash"></i> Delete
                                  </button>
                                </td>
                              </tr>

                              <tr>
                                <td className="text-center">
                                  <label>
                                    <b>Total Land Area</b>
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label>
                                    <b></b>
                                  </label>
                                </td>
                                <td className="text-center">
                                  <label>
                                    <b></b>
                                  </label>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-10">
                      <label>
                        <b>
                          D. General Description and characteristics of the
                          Barangay: (Yes or No)
                        </b>
                      </label>

                      <div className="i-checks">
                        <input
                          id="c1"
                          type="checkbox"
                          value="Plain"
                          className="form-control-custom"
                        />
                        <label for="c1">Plain</label>
                      </div>
                      <div className="i-checks">
                        <input
                          id="c2"
                          type="checkbox"
                          value="Upland"
                          className="form-control-custom"
                        />
                        <label for="c2">Upland</label>
                      </div>
                      <div className="i-checks">
                        <input
                          id="c3"
                          type="checkbox"
                          value="Mountainous"
                          className="form-control-custom"
                        />
                        <label for="c3">Mountainous</label>
                      </div>
                      <div className="i-checks">
                        <input
                          id="c4"
                          type="checkbox"
                          value="Coastal"
                          className="form-control-custom"
                        />
                        <label for="c4">Coastal</label>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label">
                          Others, specify
                        </label>
                        <div className="col-sm-6">
                          <input type="text" id="c5" className="form-control" />
                        </div>
                      </div>
                      <label>
                        <b>E. Boundaries:</b>
                      </label>
                      <div class="input-group ">
                        <span class="input-group-addon">East</span>

                        <input type="text" id="b1" className="form-control" />

                        <span class="input-group-addon"> West</span>

                        <input type="text" id="b2" className="form-control" />

                        <span class="input-group-addon">North </span>

                        <input type="text" id="b3" className="form-control" />

                        <span class="input-group-addon">South</span>

                        <input type="text" id="b4" className="form-control" />
                      </div>

                      <label>
                        <b>
                          F. Significant Historical/Tourism Land Marks/Economic
                          Activity:
                        </b>
                      </label>
                      <div class="input-group col-md-7">
                        <input type="text" id="sh" className="form-control" />

                        <div class="input-group-btn">
                          <button
                            type="button"
                            title="Clear selected files"
                            class="btn btn-primary fileinput-remove fileinput-remove-button"
                          >
                            <i class="glyphicon glyphicon-save"></i> Add Data
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div class="panel panel-default">
                        <div class="panel-heading">
                          F. Significant Historical/Tourism Land Marks/Economic
                          Activity Table
                        </div>
                        <div class="panel-body">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Value</th>
                                <th width="100px">Action</th>
                              </tr>
                            </thead>
                            <tbody id="tbl_landarea">
                              <tr>
                                <td> </td>
                                <td>
                                  <button class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i> Delete
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group text-right col-md-12">
                <input type="button" value="Edit" className="btn btn-default" />
                <a href="Demog-Ref.php" className="btn btn-secondary">
                  Skip{" "}
                </a>
                <input
                  type="button"
                  value="Save and proceed to next"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
