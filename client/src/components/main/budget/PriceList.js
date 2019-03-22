import React, { Component } from "react";
import PriceElement from "./PriceElement";

export class PriceList extends Component {
  render() {
    const dummyPriceList = [1, 2, 3, 4, 6, 7, 8, 9, 10];

    return (
      <ul>
        {dummyPriceList.map((price, i) => (
          <PriceElement
            key={price}
            price={price}
            selectPrice={this.props.selectPrice}
            priceSelected={this.props.priceSelected}
          />
        ))}
      </ul>
    );
  }
}

export default PriceList;
