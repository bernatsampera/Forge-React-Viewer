import React from "react";

export default function DisplayElement({ price }) {
  return (
    <div className={`container mt-4 ${price ? "item-selected" : "bg-light"}`}>
      <div className={`row pl-5 p-2`}>
        <span className="display-5">
          {price ? <strong> {price} € </strong> : <div> Select a price </div>}
        </span>{" "}
      </div>
    </div>
  );
}
