import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addRecord,
  deleteAllRecords,
  deselectBudgetItem
} from "../../../actions/budgetActions";
import {
  elementNotSelected,
  priceNotSelected,
  elementAlreadyAdded
} from "../../../actions/showErrorsActions";
import { recordCreated } from "../../../actions/showMessagesActions";
import PropTypes from "prop-types";
import RecordList from "./M3/RecordList";
import isEmpty from "../../../validation/is-empty";
import M3 from "./M3/M3";
import M2 from "./M2/M2";
import M1 from "./M1/M1";

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

  // Can be moved to M3
  deleteAllRecords() {
    this.props.deleteAllRecords();
  }

  addRecord() {
    const { itemSelected, records } = this.props.budget;
    const { priceSelected } = this.state;

    if (isEmpty(itemSelected)) {
      this.props.elementNotSelected();
      return false;
    } else if (records.filter(elem => elem.id == itemSelected.id).length > 0) {
      this.props.elementAlreadyAdded();
      return false;
    }

    if (isEmpty(priceSelected)) {
      this.props.priceNotSelected();
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
    this.props.recordCreated();

    this.setState({
      priceSelected: null
    });
    this.props.deselectBudgetItem();
  }

  render() {
    const {} = this.props;
    const { itemSelected } = this.props.budget;
    const { priceSelected } = this.state;
    let budgetContent;
    budgetContent = (
      <div className="row budget">
        <h3 className="col-sm-12"> Budget Creator </h3>
        <div className="col-sm-6 mt-5">
          {" "}
          {/* <DisplayElement elem={itemSelected} />
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

    return (
      <div className="budgetContainer">
        <M1 /> <M2 /> <M3 />
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
  {
    addRecord,
    deleteAllRecords,
    deselectBudgetItem,
    elementNotSelected,
    priceNotSelected,
    elementAlreadyAdded,
    recordCreated
  }
)(Budget);
