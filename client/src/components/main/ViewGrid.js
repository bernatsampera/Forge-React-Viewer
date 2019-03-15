import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TreeList from "react-treelist";
import { COLUMNS, OPTIONS, HANDLERS, setData } from "./GridOptions";
import Spinner from "../common/Spinner";
import "react-treelist/build/css/index.css";

export class ViewGrid extends Component {
  render() {
    const { objectInfo, loading } = this.props.forgeDerivative;
    let viewgridContent;

    if (objectInfo === null || loading) {
      viewgridContent = <Spinner />;
    } else {
      let data = setData([], objectInfo);
      console.log(data);
      viewgridContent = (
        <TreeList
          data={data}
          columns={COLUMNS}
          options={OPTIONS}
          handlers={HANDLERS}
          id={"id"}
          parentId={"parentId"}
          style={{ overflow: "auto" }}
        />
      );
    }

    return <div>{viewgridContent}</div>;
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
