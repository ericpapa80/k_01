<!-- 여백 제거 -->
<style>
  html, body { margin: 0; padding: 0; }
  /* OF 기본 카드/본문 마진 제거 */
  main, article, .card { margin: 0; padding: 0; border: 0; box-shadow: none; }
</style>

```js
import * as Plot from "@observablehq/plot";
import {resize} from "@observablehq/stdlib";
import {traffic} from "../data/traffic.js"; // traffic-analysis와 동일 데이터 소스

// 임베드 전용: 제목/부제/헤더 없음, 고정 높이
display(
  resize((width) =>
    Plot.plot({
      width,
      height: 500,                   // iframe 높이와 일치 권장
      margin: 40,                    // 필요시 0~40 사이 조정
      y: {grid: true, label: "↑ 일평균 유동인구 (만 명)"},
      color: {legend: true},
      marks: [
        Plot.ruleY([0]),
        Plot.line(traffic, {x: "year", y: "traffic", stroke: "location", strokeWidth: 2}),
        Plot.dot(traffic, {x: "year", y: "traffic", fill: "location"})
      ]
    })
  )
);
