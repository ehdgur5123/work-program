"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuiz } from "@/app/project/quiz/controllers/axiosQuiz";
import { QuizDocument } from "@/app/project/quiz/type";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteQuiz,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["subjectContent"] });

      const previous = queryClient.getQueryData<QuizDocument[]>([
        "subjectContent",
      ]);

      queryClient.setQueryData<QuizDocument[]>(["subjectContent"], (old) =>
        old ? old.filter((item) => item._id !== id) : []
      );

      return { previous };
    },

    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["subjectContent"], context.previous);
        console.log(`${id} 삭제 실패: ${(err as Error).message}`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjectContent"] });
    },

    onSuccess: (data) => {
      console.log(`삭제 완료, 서버 응답:`, data);
    },
  });

  return mutation;
}
