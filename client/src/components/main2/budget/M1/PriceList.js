import React, { Component } from "react";
import { connect } from "react-redux";
import { selectPrice } from "../../../../actions/budgetActions";
import PropTypes from "prop-types";
import PriceElement from "./PriceElement";

export class PriceList extends Component {
  selectPrice(price) {
    this.props.selectPrice(price);
  }

  render() {
    const { priceSelected } = this.props.budget;
    const dummyPriceList = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16];

    return (
      <ul>
        {dummyPriceList.map((price, i) => (
          <PriceElement
            key={price}
            price={price}
            selectPrice={this.selectPrice.bind(this, price)}
            priceSelected={priceSelected}
          />
        ))}
      </ul>
    );
  }
}

PriceList.propTypes = {
  selectPrice: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { selectPrice }
)(PriceList);
