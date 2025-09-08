---
title: ""
toc: false
nav: false
footer: false
---

<link rel="stylesheet" href="/embed.css">

<style>
  html,body,main,article,.card{margin:0!important;padding:0!important;border:0!important;box-shadow:none!important}
  body{overflow:hidden}
</style>

```js
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {resize} from "@observablehq/stdlib";
import {traffic} from "./data/traffic.js";

// 화면 높이를 쓰되 과도하게 커지지 않도록 캡
const getH = () => Math.min(560, Math.max(380, Math.floor((window.innerHeight || 500) * 0.9)));

display(resize((width) =>
  Plot.plot({
    width,
    height: getH(),
    marginTop: 16,
    marginRight: 16,
    marginBottom: 28,
    marginLeft: 56,
    x: {label: null, tickPadding: 4},
    y: {
      grid: true,
      label: "↑ 일평균 유동인구 (만 명)",
      domain: (() => {
        const [ymin, ymax] = d3.extent(traffic, d => d.traffic);
        return [ymin * 0.98, ymax * 1.02]; // 데이터에 밀착
      })(),
      ticks: 10
      // 또는: tickSpacing: 50
    },
    color: {legend: true},
    marks: [
      Plot.line(traffic, {x:"year", y:"traffic", stroke:"location", strokeWidth:2}),
      Plot.dot(traffic,  {x:"year", y:"traffic", fill:"location"})
    ]
  })
));

// 폰트 로드 후 재계산(하단 잘림 방지)
document?.fonts?.ready?.then(() => requestAnimationFrame(() => dispatchEvent(new Event("resize"))));
