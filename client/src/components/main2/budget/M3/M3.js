import React, { Component } from "react";
import DisplayElement from "../element/DisplayElement";
import DisplayPrice from "../element/DisplayPrice";
import isEmpty from "../../../../validation/is-empty";
import PropTypes from "prop-types";
import { RecordList } from "./RecordList";

export class M3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSelected: null
    };
  }
  selectPrice(price) {
    this.setState({ priceSelected: price });
  }

  render() {
    const {
      itemSelected,
      priceSelected,
      records,
      addRecord,
      deleteAllRecords
    } = this.props;
    return (
      <div className="m3-grid">
        <div className="row budget">
          <div className="col-sm-6">
            <DisplayElement elem={itemSelected} />
          </div>
          <div className="col-sm-6">
            <DisplayPrice price={priceSelected} />
          </div>
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-success col-sm-4 float-left"
              onClick={addRecord}
            >
              {" "}
              Add Record{" "}
            </button>
            <button
              className="btn btn-sm btn-danger col-sm-4  float-right "
              onClick={deleteAllRecords}
            >
              {" "}
              Delete All Records{" "}
            </button>
          </div>
        </div>
        <div className="" style={{ overflow: "overlay" }}>
          <RecordList records={records} />
        </div>
      </div>
    );
  }
}

M3.propTypes = {
  itemSelected: PropTypes.object,
  priceSelected: PropTypes.number,
  addRecord: PropTypes.func.isRequired,
  deleteAllRecords: PropTypes.func.isRequired,
  records: PropTypes.array.isRequired
};

export default M3;
