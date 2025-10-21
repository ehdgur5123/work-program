"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubject } from "@/app/project/quiz/controllers/axiosQuiz";

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSubject,

    onMutate: async (subject: string) => {
      // 1. 캐시된 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["subjectList"] });

      // 2. 이전 상태 저장
      const previous = queryClient.getQueryData<string[]>(["subjectList"]);

      // 3. subject 제거
      queryClient.setQueryData<string[]>(["subjectList"], (old) =>
        old ? old.filter((item) => item !== subject) : []
      );

      // 4. rollback 용으로 이전 상태 반환
      return { previous };
    },

    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["subjectList"], context.previous);
        console.log(`${id} 삭제 실패: ${(err as Error).message}`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjectList"] });
    },

    onSuccess: (data) => {
      console.log(`삭제 완료, 서버 응답:`, data);
    },
  });

  return mutation;
}
