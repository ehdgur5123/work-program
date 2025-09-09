import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

const URL = "https://www.safetydata.go.kr/V2/api/DSSP-IF-00117";
const serviceKey = process.env.FLOOD_TRACES_SERVICE_KEY;
const returnType = "JSON";
const numOfRows = 10;
const pageNo = 1;

export async function GET(req: NextRequest) {
  const response = await axios.get(URL, {
    params: {
      serviceKey: serviceKey,
      returnType: returnType,
      numOfRows: numOfRows,
      pageNo: pageNo,
    },
  });

  return NextResponse.json(response.data);
}
