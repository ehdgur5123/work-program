"use client";
import { useState } from "react";
import { postQuiz } from "./controllers/axiosQuiz";
import { QuizResponse } from "./type";

export default function ChatPage() {
  const [response, setResponse] = useState<QuizResponse | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await postQuiz(inputValue);
      setResponse(res); // 서버가 이미 파싱해서 준 객체
      console.log(res);
    } catch (error) {
      console.error(error);
      setResponse(null);
    }
  };

  const checkAnswerClick = () => {
    if (selectAnswer === response?.answer) {
      setResultMessage("정답입니다.");
      setIsAnswer(true);
    } else {
      setResultMessage("오답입니다.");
      setIsAnswer(false);
    }
  };

  return (
    <div className="flex w-1/2 gap-4 flex-col justify-center items-center mx-auto">
      <h1 className="text-6xl p-5 mt-10">QUIZ 생성기</h1>
      <form className="flex gap-2" onSubmit={sendMessage}>
        <input
          type="text"
          className="bg-white text-black pl-2"
          value={inputValue}
          placeholder="주제를 입력해주세요."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="p-2 border">
          생성
        </button>
      </form>

      {response && (
        <div>
          <div className="text-2xl p-5">
            <p className="mb-5">{response.question}</p>
            <ul className="flex flex-col gap-2">
              {response.options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => setSelectAnswer(opt)}
                  className={`pl-4 cursor-pointer ${
                    selectAnswer === opt ? "text-red-500" : "text-white"
                  }`}
                >{`${idx + 1}. ${opt}`}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="p-2 border bg-blue-400 cursor-pointer w-1/5"
              onClick={checkAnswerClick}
            >
              제출
            </button>
          </div>
          <div
            className={`flex h-20 items-center justify-center ${
              isAnswer ? "text-green-500" : "text-red-500"
            }`}
          >
            {resultMessage}
          </div>
          {isAnswer && (
            <div className="p-5 border-2 rounded-2xl text-xl">
              <p>정답: {response.answer}</p>
              <p>해설: {response.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
