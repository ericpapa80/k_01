---
title: ""
toc: false
nav: false
footer: false
---

<link rel="stylesheet" href="/embed.css">

<style>
  html,body,main,article,.card {margin:0!important; padding:0!important; border:0!important; box-shadow:none!important}
  body {overflow:hidden} /* 내부 스크롤바 제거 */
</style>

```js
import * as Plot from "@observablehq/plot";
import {resize} from "@observablehq/stdlib";
import {traffic} from "./data/traffic.js";

// iframe 내부 뷰포트에 맞춤
const getH = () => document.documentElement.clientHeight || 500;

display(resize((width) =>
  Plot.plot({
    width,
    height: getH(),     // 뷰포트 높이에 맞춤
    marginTop: 20, marginRight: 20, marginBottom: 40, marginLeft: 60,
    y:{grid:true,label:"↑ 일평균 유동인구 (만 명)"},
    color:{legend:true},
    marks:[
      Plot.ruleY([0]),
      Plot.line(traffic,{x:"year",y:"traffic",stroke:"location",strokeWidth:2}),
      Plot.dot(traffic,{x:"year",y:"traffic",fill:"location"})
    ]
  })
));
