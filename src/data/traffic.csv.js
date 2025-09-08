import {csvFormat} from "d3-dsv";

// 유동인구 데이터
const trafficData = [
  {year: 2022, location: "강남", traffic: 350},
  {year: 2022, location: "성수", traffic: 280},
  {year: 2023, location: "강남", traffic: 370},
  {year: 2023, location: "성수", traffic: 360},
  {year: 2024, location: "강남", traffic: 360},
  {year: 2024, location: "성수", traffic: 410}
];

// CSV 형식으로 출력
process.stdout.write(csvFormat(trafficData));
