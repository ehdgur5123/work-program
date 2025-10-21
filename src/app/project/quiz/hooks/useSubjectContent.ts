import { useQuery } from "@tanstack/react-query";
import { getSubjectContent } from "@/app/project/quiz/controllers/axiosQuiz";

export default function useSubjectContent(subject: string) {
  const {
    data,
    isLoading: isSubjectContentLoading,
    isError: isSubjectContentError,
  } = useQuery({
    queryKey: ["subjectContent", subject], // ✅ subject를 key로 구분
    queryFn: () => getSubjectContent(subject), // ✅ 여기서는 subject 직접 사용
    enabled: !!subject, // ✅ subject가 없을 때는 요청하지 않음
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isSubjectContentLoading,
    isSubjectContentError,
  };
}
