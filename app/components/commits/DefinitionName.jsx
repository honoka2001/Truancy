import React from "react";

export default function DefinitionName(props) {
  return (
    <span
      style={{
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
        fontSize: "0.75rem",
        fontFamily: "'Public Sans', sans-serif",
        backgroundColor: props.params.row.code,
        fontWeight: 700,
      }}
    >
      {props.params.row.name}
    </span>
  );
}
