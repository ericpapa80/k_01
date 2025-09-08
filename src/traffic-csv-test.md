---
title: 유동인구 분석 (CSV 방식)
toc: false
---

```js
// CSV 파일을 직접 불러오기
const traffic = await FileAttachment("./data/traffic.csv").csv({typed: true});
```

# 유동인구 비교 분석 (CSV 방식)

<div class="grid grid-cols-1" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "강남 vs 성수 유동인구 비교 📊 (CSV 방식)",
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

## 데이터 확인

```js
// 로드된 데이터 확인
console.log("데이터 개수:", traffic.length);
console.log("첫 번째 데이터:", traffic[0]);
console.log("전체 데이터:", traffic);
```
