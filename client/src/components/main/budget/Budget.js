import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayElement from "./element/DisplayElement";
import DisplayPrice from "./element/DisplayPrice";
import PriceList from "./PriceList";
import RecordList from "./RecordList";
import isEmpty from "../../../validation/is-empty";

export class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceSelected: null,
      recordInfo: []
    };

    this.selectPrice = this.selectPrice.bind(this);
    this.addRecord = this.addRecord.bind(this);
  }

  selectPrice(price) {
    this.setState({ priceSelected: price });
  }

  addRecord() {
    const { elem } = this.props;
    const { priceSelected } = this.state;

    if (isEmpty(elem)) {
      return false;
    }

    if (isEmpty(priceSelected)) {
      return false;
    }

    let name =
      elem["category"] ||
      elem["family"] ||
      elem["type"] ||
      elem["element"] ||
      "nomatch";

    const recordName = {
      id: elem.id,
      name: name
    };

    const record = {
      id: `r${elem.id}`,
      record: `Elem: ${name}, price: ${priceSelected} €`,
      parentId: elem.id
    };

    this.setState(prevState => ({
      recordInfo: [...prevState.recordInfo, recordName]
    }));

    this.setState(prevState => ({
      recordInfo: [...prevState.recordInfo, record]
    }));

    this.setState({
      priceSelected: null
    });
  }

  render() {
    const { elem } = this.props;
    const { priceSelected, recordInfo } = this.state;

    return (
      <div>
        <h1>Budget</h1>
        <PriceList
          selectPrice={this.selectPrice.bind(this)}
          priceSelected={this.state.priceSelected}
        />
        <div className="row">
          <div className="col-sm-11">
            {" "}
            <DisplayElement elem={elem} />
            <DisplayPrice price={priceSelected} />
          </div>
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-success col-sm-3 float-right"
              onClick={this.addRecord}
            >
              {" "}
              Add Record{" "}
            </button>
          </div>
        </div>

        <RecordList recordInfo={recordInfo} />
      </div>
    );
  }
}

Budget.propTypes = {
  elem: PropTypes.object
};

export default Budget;
