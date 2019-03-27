import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addRecord,
  deleteAllRecords,
  deselectBudgetItem
} from "../../../actions/budgetActions";
import PropTypes from "prop-types";
import DisplayElement from "./element/DisplayElement";
import DisplayPrice from "./element/DisplayPrice";
import PriceList from "./PriceList";
import RecordList from "./RecordList";
import isEmpty from "../../../validation/is-empty";

export class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceSelected: null
    };

    this.selectPrice = this.selectPrice.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.deleteAllRecords = this.deleteAllRecords.bind(this);
  }

  selectPrice(price) {
    this.setState({ priceSelected: price });
  }

  deleteAllRecords() {
    this.props.deleteAllRecords();
  }

  addRecord() {
    const { itemSelected, records } = this.props.budget;
    const { priceSelected } = this.state;

    if (
      isEmpty(itemSelected) ||
      records.filter(elem => elem.id == itemSelected.id).length > 0
    ) {
      return false;
    }

    if (isEmpty(priceSelected)) {
      return false;
    }

    let name =
      itemSelected["category"] ||
      itemSelected["family"] ||
      itemSelected["type"] ||
      itemSelected["element"] ||
      "nomatch";

    const recordName = {
      id: itemSelected.id,
      name: name
    };

    const record = {
      id: `r${itemSelected.id}`,
      record: `Elem: ${name}, price: ${priceSelected} €`,
      parentId: itemSelected.id
    };

    this.props.addRecord(recordName);
    this.props.addRecord(record);

    this.setState({
      priceSelected: null
    });
    this.props.deselectBudgetItem();
  }

  render() {
    const { itemSelected } = this.props.budget;
    const { priceSelected, recordInfo } = this.state;

    return (
      <div>
        <h1>Budget</h1>
        <PriceList
          selectPrice={this.selectPrice.bind(this)}
          priceSelected={this.state.priceSelected}
        />
        <div className="row">
          <div className="col-sm-11">
            {" "}
            <DisplayElement elem={itemSelected} />
            <DisplayPrice price={priceSelected} />
          </div>
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-danger col-sm-3 float-right"
              onClick={this.deleteAllRecords}
            >
              {" "}
              Delete All Records{" "}
            </button>
            <button
              className="btn btn-sm btn-success col-sm-3 float-right"
              onClick={this.addRecord}
            >
              {" "}
              Add Record{" "}
            </button>
          </div>
        </div>

        <RecordList recordInfo={recordInfo} />
      </div>
    );
  }
}

Budget.propTypes = {
  addRecord: PropTypes.func.isRequired,
  deleteAllRecords: PropTypes.func.isRequired,
  deselectBudgetItem: PropTypes.func.isRequired,
  elem: PropTypes.object
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { addRecord, deleteAllRecords, deselectBudgetItem }
)(Budget);
