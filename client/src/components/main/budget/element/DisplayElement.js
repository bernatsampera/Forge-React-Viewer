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

    let type = elem["category"]
      ? "category"
      : elem["family"]
      ? "family"
      : elem["type"]
      ? "type"
      : "element";

    content = (
      <div>
        <span className="display-5">
          <strong> Element </strong> ->{" "}
        </span>{" "}
        &nbsp;&nbsp;
        <strong> Name: &nbsp;</strong> {name} &nbsp;&nbsp;{" "}
        <strong>Id:&nbsp;</strong>
        {elem.id} &nbsp;&nbsp;
      </div>
    );
  } else {
    content = <div> Select an Element </div>;
  }

  return (
    <div className="container">
      <div className={`row pl-5 p-2 bg-light`}>{content}</div>
    </div>
  );
}
