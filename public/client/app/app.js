import React     from "react";
import ReactDOM  from "react-dom";
import SampleApp from "./SampleApp";

const target = document.getElementById("container");

const node = (
    <SampleApp/>
);

ReactDOM.render(node, target);
