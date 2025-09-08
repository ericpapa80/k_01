---
title: 유동인구 비교 분석
toc: false
---

```js
import {traffic} from "./data/traffic.js";
```

# 유동인구 비교 분석

<div class="grid grid-cols-1" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "강남 vs 성수 유동인구 비교 📊",
      subtitle: "2022-2024년 일평균 유동인구 변화",
      width,
      y: {
        grid: true,
        label: "↑ 일평균 유동인구 (만 명)"
      },
      color: {
        legend: true
      },
      marks: [
        Plot.line(traffic, {
          x: "year",
          y: "traffic",
          stroke: "location",
          marker: "circle",
          tip: true
        }),
        Plot.ruleY([0])
      ]
    }))
  }</div>
</div>
