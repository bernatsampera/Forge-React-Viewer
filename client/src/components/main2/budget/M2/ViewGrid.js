import React, { Component } from "react";
import PropTypes from "prop-types";
import TreeList from "react-treelist";
import { connect } from "react-redux";
import { selectBudgetItem } from "../../../../actions/budgetActions";
import { COLUMNS, OPTIONS, setData } from "./GridOptions";
import "react-treelist/build/css/index.css";

export class ViewGrid extends Component {
  render() {
    const { objectInfo } = this.props.forgeDerivative;
    const { selectBudgetItem } = this.props;
    const HANDLERS = {
      onSelectRow(elem) {
        selectBudgetItem(elem);
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
  selectBudgetItem: PropTypes.func.isRequired,
  forgeDerivative: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeDerivative: state.forgeDerivative
});

export default connect(
  mapStateToProps,
  { selectBudgetItem }
)(ViewGrid);
