---
title: ""
toc: false
nav: false
footer: false
---

<link rel="stylesheet" href="/embed.css">

<style>
  html,body,main,article,.card {margin:0!important; padding:0!important; border:0!important; box-shadow:none!important}
  body {overflow:hidden} /* 내부 스크롤 제거 */
</style>

```js
import * as Plot from "@observablehq/plot";
import {resize} from "@observablehq/stdlib";
import {traffic} from "./data/traffic.js";

// 현재 뷰포트 높이 반환(스크롤·툴바 오차 최소화)
const getH = () => Math.max(320, Math.floor(window.innerHeight || 500));

display(
  resize((width) =>
    Plot.plot({
      width,
      height: 480,           // 부모 iframe 높이에 정확히 맞춤
      marginTop: 16,
      marginRight: 16,
      marginBottom: 56,         // 축/범례 여유
      marginLeft: 56,
      y: {grid:true, label:"↑ 일평균 유동인구 (만 명)", tickSpacing: 50 },
      color: {legend: true},    // 잘리면 일단 false로 테스트
      marks: [
        Plot.ruleY([0]),
        Plot.line(traffic, {x:"year", y:"traffic", stroke:"location", strokeWidth:2}),
        Plot.dot(traffic,  {x:"year", y:"traffic", fill:"location"})
      ]
    })
  )
);

// 폰트 로드 후 재측정으로 하단 잘림 방지
if (document?.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(() => dispatchEvent(new Event("resize"))));
