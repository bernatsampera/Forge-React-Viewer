import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRecord } from "../../../actions/budgetActions";
import TreeList from "react-treelist";
import { COLUMNS, OPTIONS } from "./RecordGridOptions";

export class RecordList extends Component {
  render() {
    const { records } = this.props.budget;
    const HANDLERS = {};
    return (
      <div>
        <TreeList
          data={records}
          columns={COLUMNS}
          options={OPTIONS}
          handlers={HANDLERS}
          id={"id"}
          parentId={"parentId"}
          style={{ overflow: "auto" }}
        />
      </div>
    );
  }
}

RecordList.propTypes = {
  deleteRecord: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { deleteRecord }
)(RecordList);
