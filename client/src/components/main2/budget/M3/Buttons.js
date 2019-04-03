import React, { Component } from "react";

export class Buttons extends Component {
  render() {
    return (
      <div className="row budget">
        <h3 className="col-sm-12"> Budget Creator </h3>
        <div className="col-sm-6 mt-5">
          {" "}
          {/*           <DisplayElement elem={itemSelected} />
          <DisplayPrice price={priceSelected} /> */}
        </div>
        <div className="col-sm-12">
          <button
            className="btn btn-sm btn-success col-sm-4 float-left m-2"
            onClick={this.addRecord}
          >
            {" "}
            Add Record{" "}
          </button>
          <button
            className="btn btn-sm btn-danger col-sm-4  float-right m-2"
            onClick={this.deleteAllRecords}
          >
            {" "}
            Delete All Records{" "}
          </button>
        </div>
      </div>
    );
  }
}
export default Buttons;
