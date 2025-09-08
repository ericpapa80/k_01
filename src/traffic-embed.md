---
title: ""       # 제목 제거
toc: false      # 목차 제거
nav: false      # 이전/다음 페이지 네비 제거
footer: false   # "Built with Observable" 푸터 제거
---

<!-- 전역 embed.css 불러오기 -->
<link rel="stylesheet" href="/embed.css">

<!-- 기본 여백 제거 -->
<style>
  html, body {
    margin: 0; padding: 0;
    height: 100%; width: 100%;
  }
  main, article, .card {
    margin: 0; padding: 0;
    border: 0; box-shadow: none;
  }
</style>

```js
import * as Plot from "@observablehq/plot";
import {resize} from "@observablehq/stdlib";
import {traffic} from "./data/traffic.js";

// embed 전용 차트: 여백 없이 차트만 출력
display(
  resize((width) =>
    Plot.plot({
      width,
      height: 500,               // iframe 높이와 일치시킬 것
      marginTop: 20,
      marginRight: 20,
      marginBottom: 40,
      marginLeft: 60,
      y: { grid: true, label: "↑ 일평균 유동인구 (만 명)" },
      color: { legend: true },
      marks: [
        Plot.ruleY([0]),
        Plot.line(traffic, {
          x: "year",
          y: "traffic",
          stroke: "location",
          strokeWidth: 2
        }),
        Plot.dot(traffic, { x: "year", y: "traffic", fill: "location" })
      ]
    })
  )
);
