import React from "react";

export default function DisplayElement({ price }) {
  return (
    <div className={`container  ${price ? "item-selected" : "bg-light"}`}>
      <div className={`row pt-2`}>
        <span className="display-5">
          {price ? (
            <strong>Price -> {price} € </strong>
          ) : (
            <div> Select a price </div>
          )}
        </span>{" "}
      </div>
    </div>
  );
}
