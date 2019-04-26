import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getViewerAccess } from "../../../actions/forgeAuthActions";
import jQuery from "jquery";
import isEmpty from "../../../validation/is-empty";
import isValid from "../../../validation/is-valid";

export class ViewerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerApp: null,
      viewer: null,
      documentId: localStorage.documentId || null,
      itemSelected: null
    };
  }

  componentDidMount() {
    this.props.getViewerAccess();
    // Sets the documentId to the state and the localStorage if it's not present
    if (!this.state.documentId) {
      this.setState({ documentId: `urn:${this.props.urn}` });
      localStorage.setItem("documentId", `urn:${this.props.urn}`);
    }
    // Initializes Viewer App
  }

  componentWillReceiveProps(nextProps) {
    // Select item selected in tree component
    if (nextProps.forgeViewer.itemSelected) {
      const { itemSelected } = nextProps.forgeViewer;
      const { viewer } = this.state;
      if (viewer) {
        this.state.viewer.impl.selector.setSelection(
          [itemSelected],
          this.state.viewer.model
        );
      }
    }
    if (nextProps.forgeViewer.viewer_token) {
      this.setState(
        {
          viewerApp: new window.Autodesk.Viewing.ViewingApplication(
            "MyViewerDiv"
          )
        },
        () =>
          window.Autodesk.Viewing.Initializer(
            {
              env: "AutodeskProduction",
              api: "derivativeV2", // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
              getAccessToken: this.getForgeToken
            },
            this.callback
          )
      );
    }
  }

  componentWillUnmount() {
    // Finish the viewer if the page is reloaded or another type of unmounitng
    if (this.state.viewer) {
      this.state.viewer.finish();
    }
  }

  callback = () => {
    const { viewerApp, documentId } = this.state;
    if (viewerApp) {
      viewerApp.registerViewer(
        viewerApp.k3D,
        window.Autodesk.Viewing.Private.GuiViewer3D
      );
      viewerApp.loadDocument(
        documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    }
  };

  getForgeToken = callback => {
    const { viewer_token } = this.props.forgeViewer;
    if (!isEmpty(viewer_token) && isValid(viewer_token)) {
      callback(viewer_token.access_token, viewer_token.expires_in);
    } else {
      this.props.getViewerAccess();
    }
  };

  onDocumentLoadSuccess = doc => {
    // Gets all the possibles viewables
    const { viewerApp } = this.state;
    const viewables = viewerApp.bubble.search({ type: "geometry" });

    // Selects the viewable that will be displayed, in this case the first, [0], in the array viewables
    viewerApp.selectItem(
      viewables[0],
      this.onItemLoadSuccess,
      this.onItemLoadFail
    );
  };

  onItemLoadSuccess = (viewer, item) => {
    // Event fired if the viewer is setup without error, sets the viewer to the state
    this.setState({ viewer: viewer }, () => {
      this.setEvents();
    });
  };

  onItemLoadFail = viewerErrorCode => {
    // Error if translation is in progress
    console.log(viewerErrorCode);

    jQuery("#MyViewerDiv").html(
      "<p>Translation in progress... Please try refreshing the page.</p>"
    );
  };

  onDocumentLoadFailure = viewerErrorCode => {
    // Fires if the loaded of the svf file failes
    console.log(viewerErrorCode);
    jQuery("#MyViewerDiv").html(
      "<p>There is an error fetching the translated SVF file. Please try refreshing the page.</p>"
    );
  };

  setEvents() {
    // Event for selection
    this.onSelectionBinded = this.onSelectionEvent.bind(this);
    this.state.viewer.addEventListener(
      window.Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      this.onSelectionBinded
    );
  }

  onSelectionEvent() {
    let currSelection = this.state.viewer.getSelection();
    this.setState({ itemSelected: currSelection });
  }

  render() {
    const { itemSelected } = this.state;
    const { displayViewer } = this.props;

    return (
      <div style={!displayViewer ? { visibility: "hidden" } : {}}>
        <div style={canvasStyle}>
          <span style={textStyle}> Item: {itemSelected}</span>
          <div id="MyViewerDiv" />
        </div>
      </div>
    );
  }
}

const textStyle = {
  zIndex: "2",
  position: "absolute",
  top: "2vh",
  left: "3vw"
};

const canvasStyle = {
  position: "fixed",
  left: "40vw",
  right: "0px",
  top: "100px",
  bottom: "0px",
  zIndex: "1",
  backgroundColor: "#D8E1EA"
};

ViewerItem.propTypes = {
  getViewerAccess: PropTypes.func.isRequired,
  urn: PropTypes.string.isRequired,
  forgeViewer: PropTypes.object.isRequired,
  displayViewer: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  forgeViewer: state.forgeViewer
});

export default connect(
  mapStateToProps,
  { getViewerAccess }
)(ViewerItem);
