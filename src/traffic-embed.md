```js
import * as Plot from "@observablehq/plot";
import {resize} from "@observablehq/stdlib";
import {traffic} from "./data/traffic.js";   // ✅ 반드시 ./data

display(
  resize((width) =>
    Plot.plot({
      width,
      height: 500,
      margin: 40,
      y: { grid: true, label: "↑ 일평균 유동인구 (만 명)" },
      color: { legend: true },
      marks: [
        Plot.ruleY([0]),
        Plot.line(traffic, { x: "year", y: "traffic", stroke: "location" }),
        Plot.dot(traffic, { x: "year", y: "traffic", fill: "location" })
      ]
    })
  )
);
