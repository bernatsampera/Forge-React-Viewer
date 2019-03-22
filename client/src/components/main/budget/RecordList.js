import React, { Component } from "react";
import { COLUMNS, OPTIONS } from "./RecordGridOptions";
import PropTypes from "prop-types";
import TreeList from "react-treelist";

export class RecordList extends Component {
  render() {
    const { recordInfo } = this.props;
    const HANDLERS = {};
    return (
      <div>
        <TreeList
          data={recordInfo}
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
  recordInfo: PropTypes.array.isRequired
};

export default RecordList;
