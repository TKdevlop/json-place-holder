import React from "react";
import "./spinner.css";
export default function Spinner() {
  return (
    <div style={{ marginLeft: "47vw", marginTop: "20vh" }}>
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}
