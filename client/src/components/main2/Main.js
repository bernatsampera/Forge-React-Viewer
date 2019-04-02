import React, { Component } from "react";
import Budget from "./budget/Budget";

// This component changes the display between the viewer/design/budget pages
export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "budget"
    };

    this.handleComponent = this.handleComponent.bind(this);
  }

  handleComponent(e) {
    this.setState({ display: e.target.name });
  }

  render() {
    const { display } = this.state;
    let mainContent;

    switch (display) {
      case "budget":
        mainContent = <Budget />;
        break;
      case "viewer":
        mainContent = <h1> Viewer </h1>;
        break;
      case "design":
        mainContent = <h1> Design </h1>;
        break;
      default:
        break;
    }

    return (
      <div>
        <div className="buttons-container text-left">
          <button
            name="budget"
            className={`btn btn-dark ${display == "budget" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Budget{" "}
          </button>
          <button
            name="viewer"
            className={`btn btn-dark ${display == "viewer" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Viewer{" "}
          </button>
          <button
            name="design"
            className={`btn btn-dark ${display == "design" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Design{" "}
          </button>
        </div>
        {mainContent}
      </div>
    );
  }
}

export default Main;
