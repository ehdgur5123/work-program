"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/testcode/api";

type FloodBodyItem = {
  SN: number; //일련번호
  FLDN_DST_NM: string; //침수재해명
  FLDN_CS_DTL_NM: string; //침수원인상세명
  FLDN_YR: string; //침수연도
  FLDN_GRD: number; //침수등급
  FLDN_DOWA: number; //침수수심
  FLDN_BGNG_YMD: string; //침수시작일자
  FLDN_END_YMD: string; //침수종료일자
  FLDN_BGNG_TM: string; //침수시작시각
  FLDN_END_TM: string; //침수종료시각
  STDG_CTPV_CD: string; //법정동시도코드
  STDG_SGG_CD: string; //법정동시군구코드
  FLDN_AREA: string; //침수면적
  GEOM: string; //지오메트리
};

type floodDataType = {
  header: object;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  body: FloodBodyItem[];
};

export default function TestcodePage() {
  const [floodData, setFloodData] = useState<floodDataType | undefined>();

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(URL);
      setFloodData(response.data);
    };
    request();
  }, []);

  const handleSubmit = () => {};
  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <input type="text" className="bg-white" />
        <button type="submit" className="p-2">
          호출
        </button>
      </form>
      <p>전체 데이터 수 : {floodData?.totalCount}</p>
      <p>현재 페이지 : {floodData?.pageNo} </p>
      {floodData?.body.map((item) => (
        <div key={item.SN} className="border-2">
          <p>침수재해명 : {item.FLDN_DST_NM}</p>
          <p>침수수심 : {item.FLDN_DOWA}</p>
          <p>지오메트리: {item.GEOM}</p>
        </div>
      ))}
    </div>
  );
}
