import React, { Component } from "react";
import { connect } from "react-redux";
import { selectItem } from "../../../actions/forgeViewerActions";
import PropTypes from "prop-types";
import TreeView from "react-treeview";
import "./Tree.css";

export class Tree extends Component {
  handleClick(id) {
    this.props.selectItem(id);
  }

  render() {
    const { objectInfo } = this.props;
    //console.log(objectInfo);
    return (
      <div>
        {objectInfo.objects.map((node, i) => {
          const label = (
            <span
              className="node"
              onClick={this.handleClick.bind(this, node.objectid)}
            >
              {node.name}
            </span>
          );
          if (node.objects) {
            return (
              <TreeView
                key={node.objectid}
                nodeLabel={label}
                defaultCollapsed={true}
              >
                <Tree
                  key={node.objectid}
                  objectInfo={node}
                  selectItem={this.props.selectItem}
                />
              </TreeView>
            );
          } else {
            return (
              <span
                key={node.objectid}
                className="info"
                onClick={this.handleClick.bind(this, node.objectid)}
              >
                {node.name}
              </span>
            );
          }
        })}
      </div>
    );
  }
}

Tree.propTypes = {
  selectItem: PropTypes.func.isRequired,
  objectInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { selectItem }
)(Tree);
