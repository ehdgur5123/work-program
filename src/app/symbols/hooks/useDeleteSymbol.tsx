import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSymbol } from "@/app/symbols/controllers/axiosSymbols";
import { SymbolItemType } from "@/app/symbols/types";

export default function useDeleteSymbol() {
  const queryClient = useQueryClient();

  return useMutation({
    // 서버 요청 수행
    mutationFn: deleteSymbol,

    // 낙관적 UI
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["symbols"] });
      const previous = queryClient.getQueryData<SymbolItemType[]>(["symbols"]);

      queryClient.setQueryData<SymbolItemType[]>(["symbols"], (old) =>
        old ? old.filter((item) => item._id !== id) : []
      );

      return { previous };
    },

    // 요청 실패 시, 롤백
    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["symbols"], context.previous);
        console.log(`${id} 삭제 실패: ${(err as Error).message}`);
      }
    },

    // 요청 완료 후 캐시 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },

    // 서버 성공 시 추가 작업
    onSuccess: (data) => {
      console.log(`삭제 완료, 서버 응답:`, data);
    },
  });
}
