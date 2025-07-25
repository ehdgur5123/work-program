// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("환경 변수에 MONGODB_URI이 없습니다.");
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("몽고DB 연결 성공");
  } catch (err) {
    console.error("몽고DB 연결 실패: ", err);
    throw err;
  }
};
