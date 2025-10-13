import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchSymbol } from "@/app/project/symbols/controllers/axiosSymbols";
import {
  SymbolItemType,
  updatedSymbolItemType,
} from "@/app/project/symbols/types";

export default function useUpdateSymbol() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: updatedSymbolItemType }) =>
      patchSymbol(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["symbols"] });
      const previous = queryClient.getQueryData<SymbolItemType[]>(["symbols"]);

      queryClient.setQueryData<SymbolItemType[]>(["symbols"], (old) =>
        old
          ? old.map((item) => (item._id === id ? { ...item, ...data } : item))
          : []
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["symbols"], context.previous);
        console.log(`${variables.id} 수정 실패: ${(err as Error).message}`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },

    onSuccess: (data) => {
      console.log(`수정 완료, 서버 응답:`, data);
    },
  });

  return mutation;
}
