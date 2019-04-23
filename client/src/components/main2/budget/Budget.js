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
import { SortablePane, Pane } from "react-sortable-pane";
import "./budget.css";

export class Budget extends Component {
  constructor(props) {
    super(props);

    this.addRecord = this.addRecord.bind(this);
    this.deleteAllRecords = this.deleteAllRecords.bind(this);
  }

  // Can be moved to M3
  deleteAllRecords() {
    this.props.deleteAllRecords();
  }

  addRecord() {
    const { itemSelected, records, priceSelected } = this.props.budget;

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
  }

  render() {
    const { itemSelected, priceSelected, records } = this.props.budget;

    return (
      <div className="budgetContainer">
        <SortablePane
          direction="horizontal"
          margin={20}
          defaultOrder={["m1", "m2", "m3"]}
          disableEffect={true}
          className="paneContainer"
        >
          <Pane
            key="m1"
            defaultSize={{ width: "20%", height: "100%" }}
            className="pane"
          >
            <M1 />
          </Pane>
          <Pane
            key="m2"
            defaultSize={{ width: "40%", height: "100%" }}
            className="m2-pane"
          >
            <M2 />
          </Pane>
          <Pane
            key="m3"
            defaultSize={{ width: "35%", height: "100%" }}
            className="pane"
          >
            <M3
              itemSelected={itemSelected}
              priceSelected={priceSelected}
              addRecord={this.addRecord}
              deleteAllRecords={this.deleteAllRecords}
              records={records}
            />
          </Pane>
        </SortablePane>
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
