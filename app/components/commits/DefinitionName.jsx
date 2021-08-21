import React from "react";

export default function DefinitionName(props) {
  const color = "#" + props.params.row.code;
  return (
    <span
      style={{
        color: color,
        height: 22,
        minWidth: 30,
        lineHeight: 0,
        borderRadius: 8,
        cursor: "default",
        alignItems: "center",
        whiteSpace: "nowrap",
        display: "inline-flex",
        justifyContent: "center",
        padding: "0px 8px",
        color: "rgb(34, 154, 22)",
        fontSize: "0.75rem",
        fontFamily: "'Public Sans', sans-serif",
        backgroundColor: "rgba(84, 214, 44, 0.16)",
        fontWeight: 700,
      }}
    >
      {props.params.row.name}
      {console.log(props.params.row)}
    </span>
  );
}
