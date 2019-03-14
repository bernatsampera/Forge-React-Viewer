import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TreeList from "react-treelist";
import "react-treelist/build/css/index.css";

export class ViewGrid extends Component {
  setData(data, objectInfo, parentId = -1, index = 0) {
    objectInfo.map(object => {
      switch (index) {
        case 0:
          data.push({ id: object.objectid, category: object.name });
          break;
        case 1:
          data.push({ id: object.objectid, family: object.name, parentId });
          break;
        case 2:
          data.push({ id: object.objectid, type: object.name, parentId });
          break;
        case 3:
          data.push({ id: object.objectid, element: object.name, parentId });
          break;
        default:
      }

      if (object.objects) {
        ++index;
        this.setData(data, object.objects, object.objectid, index);
        --index;
      }
    });
    return data;
  }

  render() {
    const { objectInfo } = this.props.forgeDerivative;
    console.log(objectInfo);
    let data = this.setData([], objectInfo);

    console.log(data);

    const COLUMNS = [
      {
        title: "Category",
        field: "category",
        type: "string"
      },
      {
        title: "Family",
        field: "family",
        type: "string"
      },
      {
        title: "Type",
        field: "type",
        type: "string"
      },
      {
        title: "Element",
        field: "element",
        type: "string"
      }
    ];

    const OPTIONS = {
      minimumColWidth: 100,
      expandAll: false,
      height: 500,
      canSelect: true
    };

    const HANDLERS = {
      onSelectRow(row) {
        console.log(row);
      }
    };

    return (
      <div>
        <TreeList
          data={data}
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
  forgeDerivative: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeDerivative: state.forgeDerivative
});

export default connect(
  mapStateToProps,
  {}
)(ViewGrid);
