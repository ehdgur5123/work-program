import useIsMobile from "@/app/hooks/useIsMobile";
import { useQuizStore } from "@/app/quiz/stores/useQuizStore";
import useQuizAnswer from "@/app/quiz/hooks/useQuizAnswer";

export default function QuizWindow() {
  const isMobile = useIsMobile();
  const quizData = useQuizStore((state) => state.quizData);
  const {
    selectAnswer,
    setSelectAnswer,
    isCorrectAnswer,
    setIsCorrectAnswer,
    answerFeedback,
    setAnswerFeedback,
  } = useQuizAnswer();

  const checkAnswerClick = () => {
    if (selectAnswer === quizData?.answer) {
      setAnswerFeedback("정답입니다.");
      setIsCorrectAnswer(true);
    } else {
      setAnswerFeedback("오답입니다.");
      setIsCorrectAnswer(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`${isMobile ? "text-[20px]" : "text-2xl"}`}>
        <p className="mb-5">{quizData?.question}</p>
        <ul className="flex flex-col gap-2">
          {quizData?.options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => setSelectAnswer(opt)}
              className={`pl-4 cursor-pointer ${
                selectAnswer === opt
                  ? "text-red-500"
                  : "text-white hover:text-gray-500"
              }`}
            >{`${idx + 1}. ${opt}`}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="p-2 border bg-blue-600 text-white w-1/5 rounded-lg 
           shadow-md shadow-black/30 
           transition hover:bg-blue-500 
           active:scale-95 active:shadow-2xl active:shadow-black/60"
          onClick={checkAnswerClick}
        >
          제출
        </button>
      </div>
      <div
        className={`flex h-20 items-center justify-center ${
          isCorrectAnswer ? "text-green-500" : "text-red-500"
        }`}
      >
        {answerFeedback}
      </div>
      {isCorrectAnswer && (
        <div className="p-5 border-2 rounded-2xl text-xl">
          <p>정답: {quizData?.answer}</p>
          <p>해설: {quizData?.explanation}</p>
        </div>
      )}
    </div>
  );
}
