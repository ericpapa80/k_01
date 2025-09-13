---
title: "Mapbox + Deck.gl: Bearborn Step 2"
toc: false
---

```js
import mapboxgl from "npm:mapbox-gl";
import {Deck} from "npm:@deck.gl/core@^9";
import {GeoJsonLayer} from "npm:@deck.gl/layers@^9";
import {FileAttachment} from "@observablehq/stdlib";

// Mapbox CSS 주입
{
  const href = import.meta.resolve("npm:mapbox-gl/dist/mapbox-gl.css");
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = Object.assign(document.createElement("link"), {rel: "stylesheet", href});
    document.head.appendChild(link);
  }
}

// DOM 컨테이너
const wrap = html`<div style="width:100%; height:1200px;"></div>`;
display(wrap);

// Mapbox 초기화
mapboxgl.accessToken = "pk.eyJ1IjoiZXJpY3BlcHB5IiwiYSI6ImNqOW55ZjBlcTE4bXgyeHF6cW50dDRybHoifQ.PideFvhzss6L4U4M-nouYQ";

const map = new mapboxgl.Map({
  container: wrap,
  style: "mapbox://styles/ericpeppy/cmda6tz3y03cq01r4angf5bph",
  center: [127.0, 37.56],
  zoom: 12
});

map.addControl(new mapboxgl.NavigationControl(), "top-right");

// GeoJSON 파일 로드 (원래 parcels 데이터)
const geojsonData = await import("./data/parcels_seoul_4326.geojson.js");

// 스타일
const lineColor = [255, 0, 0, 255]; // 빨간색 테두리
const fillColor = [255, 255, 0, 200]; // 노란색 채우기 (더 진하게)

// Deck.gl 캔버스 생성
const deckCanvas = document.createElement('canvas');
deckCanvas.style.position = 'absolute';
deckCanvas.style.top = '0';
deckCanvas.style.left = '0';
deckCanvas.style.width = '100%';
deckCanvas.style.height = '100%';
deckCanvas.style.pointerEvents = 'none'; // Mapbox 이벤트를 차단하지 않도록
wrap.appendChild(deckCanvas);

// Deck.gl 인스턴스 생성
const deck = new Deck({
  canvas: deckCanvas,
  initialViewState: {
    longitude: 127.0,
    latitude: 37.56,
    zoom: 12
  },
  controller: false, // Mapbox가 컨트롤을 담당
  getCursor: () => 'default', // 커서 스타일 설정
  layers: [
    new GeoJsonLayer({
      id: "test-polygons",
      data: geojsonData.default,
      stroked: true,
      filled: true,
      getLineColor: lineColor,
      getFillColor: fillColor,
      lineWidthMinPixels: 2, // 폴리곤 테두리 두께
      pickable: true,
      onClick: info => {
        if (info.object) {
          console.log("클릭된 폴리곤:", info.object.properties);
          alert(`클릭된 위치: ${info.object.properties.name}`);
        }
      }
    })
  ]
});

// Mapbox와 Deck.gl 연동
map.on('move', () => {
  deck.setProps({
    viewState: {
      longitude: map.getCenter().lng,
      latitude: map.getCenter().lat,
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    }
  });
});

// 리사이즈 대응
const ro = new ResizeObserver(() => map.resize());
ro.observe(wrap);
window.addEventListener("visibilitychange", () => map.resize());
window.addEventListener("orientationchange", () => map.resize());

// 정리
invalidation.then(() => map.remove());
