import useIsMobile from "@/app/hooks/useIsMobile";
import { QuizDocument } from "@/app/project/quiz/type";
import useQuizAnswer from "@/app/project/quiz/hooks/useQuizAnswer";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteQuiz } from "@/app/project/quiz/hooks/useDeleteQuiz";

interface QuizWindowProps {
  quizData: QuizDocument;
}

export default function QuizWindow({ quizData }: QuizWindowProps) {
  const isMobile = useIsMobile();
  const { mutate: deleteQuizMutate } = useDeleteQuiz();

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

  const handleDelete = () => {
    deleteQuizMutate(String(quizData._id), {
      onSuccess: () => {
        console.log("삭제성공");
      },
    });
  };

  return (
    /* QuizWindow (부모 그라데이션에 어울리는 파스텔 톤) */
    <div className="w-full mx-auto p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg">
      {/* 문제 텍스트 */}
      <div
        className={`${
          isMobile ? "text-lg" : "text-2xl"
        } font-bold text-pink-600`}
      >
        <p className="mb-4">{quizData?.question}</p>

        {/* 선택지: 버튼 형태로 터치/접근성 최적화 */}
        <ul className="flex flex-col gap-3">
          {quizData?.options.map((opt, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => setSelectAnswer(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition ease-in-out duration-150
              ${
                selectAnswer === opt
                  ? "bg-pink-500/20 border-pink-400 text-pink-700 font-semibold shadow-inner"
                  : "bg-white/60 border-pink-100 text-pink-700 hover:bg-pink-50 hover:border-pink-200"
              }
            `}
              >
                <span className="inline-block w-6 font-semibold">
                  {idx + 1}.
                </span>
                <span className="align-middle">{opt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 제출 버튼: 부모의 핑크→앰버 그라데이션과 연계 */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          type="button"
          onClick={checkAnswerClick}
          className="w-full sm:w-36 py-2 rounded-full font-semibold
        bg-gradient-to-r from-pink-500 to-amber-400 text-white shadow-md
        transition hover:from-pink-400 hover:to-amber-300 active:scale-95"
        >
          제출
        </button>
        <button
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition"
          onClick={handleDelete}
        >
          <TrashIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 피드백 */}
      <div
        className={`flex h-16 items-center justify-center font-bold mt-3
      ${
        isCorrectAnswer === true
          ? "text-green-600"
          : isCorrectAnswer === false
          ? "text-red-600"
          : "text-pink-600"
      }
    `}
      >
        {answerFeedback}
      </div>

      {/* 정답 / 해설 (정답일 때만 노출) */}
      {isCorrectAnswer === true && (
        <div className="p-4 mt-3 border-2 border-green-200 rounded-2xl bg-green-50 text-green-800 text-base sm:text-lg">
          <p className="mb-2">
            ✅ 정답: <span className="font-bold">{quizData?.answer}</span>
          </p>
          <p>💡 해설: {quizData?.explanation}</p>
        </div>
      )}
    </div>
  );
}
