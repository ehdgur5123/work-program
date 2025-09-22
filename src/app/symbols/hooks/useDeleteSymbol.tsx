import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSymbol } from "@/app/symbols/controllers/axiosSymbols";
import { SymbolItemType } from "@/app/symbols/types";

export default function useDeleteSymbol() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // 서버 요청 수행
    mutationFn: deleteSymbol,

    // 뮤테이션 함수가 실행되기 바로 전에 실행하는 함수
    onMutate: async (id: string) => {
      // cancelQueries란,
      // 뮤테이션 요청 중에 동일 쿼리가 백그라운드에서 refetch되어
      // 서버와 UI 상태가 불일치하는 것을 방지하기 위해,
      // 진행 중인 쿼리를 취소하는 함수
      await queryClient.cancelQueries({ queryKey: ["symbols"] });
      const previous = queryClient.getQueryData<SymbolItemType[]>(["symbols"]);

      queryClient.setQueryData<SymbolItemType[]>(["symbols"], (old) =>
        old ? old.filter((item) => item._id !== id) : []
      );

      return { previous };
    },

    // 요청 실패 시, 실행될 함수
    onError: (err, id, context) => {
      // context에는 onMutate에서 리턴한 데이터가 들어감.
      if (context?.previous) {
        queryClient.setQueryData(["symbols"], context.previous);
        console.log(`${id} 삭제 실패: ${(err as Error).message}`);
      }
    },

    // 항상 실행 될 함수
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },

    // 요청 성공 시, 실행될 함수
    onSuccess: (data) => {
      console.log(`삭제 완료, 서버 응답:`, data);
    },
  });

  return mutation;
}
