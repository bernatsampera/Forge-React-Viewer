import React, { Component } from "react";
import PropTypes from "prop-types";
import TreeList from "react-treelist";
import { COLUMNS, OPTIONS } from "./RecordGridOptions";

export class RecordList extends Component {
  render() {
    const { records } = this.props;

    const HANDLERS = {};
    return (
      <div className="mt-3">
        <h3> Record List </h3>
        <TreeList
          data={records} // records
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
  records: PropTypes.array.isRequired
};

export default RecordList;
