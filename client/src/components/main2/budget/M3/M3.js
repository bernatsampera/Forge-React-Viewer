import React, { Component } from "react";
import DisplayElement from "../element/DisplayElement";
import DisplayPrice from "../element/DisplayPrice";
import Buttons from "./Buttons";
import isEmpty from "../../../../validation/is-empty";

export class M3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSelected: null
    };
  }
  selectPrice(price) {
    this.setState({ priceSelected: price });
  }

  addRecord() {
    const { itemSelected, records } = this.props.budget;
    const { priceSelected } = this.state;

    if (isEmpty(itemSelected)) {
      this.props.elementNotSelected();
      return false;
    } else if (records.filter(elem => elem.id == itemSelected.id).length > 0) {
      this.props.elementAlreadyAdded();
      return false;
    }

    if (isEmpty(priceSelected)) {
      this.props.priceNotSelected();
      return false;
    }

    let name =
      itemSelected["category"] ||
      itemSelected["family"] ||
      itemSelected["type"] ||
      itemSelected["element"] ||
      "nomatch";

    const recordName = {
      id: itemSelected.id,
      name: name
    };

    const record = {
      id: `r${itemSelected.id}`,
      record: `Elem: ${name}, price: ${priceSelected} €`,
      parentId: itemSelected.id
    };

    this.props.addRecord(recordName);
    this.props.addRecord(record);
    this.props.recordCreated();

    this.setState({
      priceSelected: null
    });
    this.props.deselectBudgetItem();
  }

  render() {
    return (
      /*       <div className="col-sm-6 mt-5">
        {" "}
        <DisplayElement elem={itemSelected} />
        <DisplayPrice price={priceSelected} />
      </div> */
      <Buttons />
    );
  }
}

export default M3;
