import React, { Component } from "react";
import PropTypes from "prop-types";
import TreeList from "react-treelist";
import { COLUMNS, OPTIONS, setData } from "./GridOptions";
import "react-treelist/build/css/index.css";

export class ViewGrid extends Component {
  render() {
    const { onSelectRow, objectInfo } = this.props;
    const HANDLERS = {
      onSelectRow(elem) {
        onSelectRow(elem);
      }
    };
    return (
      <div>
        {" "}
        <TreeList
          data={setData([], objectInfo)}
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

ViewGrid.propTypes = {
  onSelectRow: PropTypes.func.isRequired,
  objectInfo: PropTypes.array.isRequired
};

export default ViewGrid;
