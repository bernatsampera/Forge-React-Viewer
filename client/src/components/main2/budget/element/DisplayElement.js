import React from "react";

export default function DisplayElement({ elem }) {
  let content;

  if (elem) {
    let name =
      elem["category"] ||
      elem["family"] ||
      elem["type"] ||
      elem["element"] ||
      "nomatch";

    content = (
      <div>
        <span className="display-5">
          <strong> Element </strong> ->{" "}
        </span>{" "}
        &nbsp;&nbsp;
        {name} &nbsp;&nbsp; <strong>Id:&nbsp;</strong>
        {elem.id} &nbsp;&nbsp;
      </div>
    );
  } else {
    content = <div> Select an Element </div>;
  }

  return (
    <div className={`container ${elem ? "text-green" : "bg-light"}`}>
      <div className={`row pt-2 `}>{content}</div>
    </div>
  );
}
