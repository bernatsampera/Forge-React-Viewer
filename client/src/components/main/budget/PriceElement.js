import React from "react";

export default function PriceElement({ price, priceSelected, selectPrice }) {
  return (
    <li
      style={priceElement}
      className={priceSelected == price ? "price-selected" : ""}
      onClick={selectPrice.bind(this, price)}
    >
      {price} €
    </li>
  );
}

const priceElement = {
  cursor: "pointer",
  listStyle: "none"
};
