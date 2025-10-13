import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSymbol } from "@/app/project/symbols/controllers/axiosSymbols";
import {
  SymbolItemType,
  createSymbolItemType,
} from "@/app/project/symbols/types";
import { v4 as uuidv4 } from "uuid";

export default function useCreatedSymbol() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postSymbol,

    onMutate: async (data: createSymbolItemType) => {
      await queryClient.cancelQueries({ queryKey: ["symbols"] });
      const previous = queryClient.getQueryData<SymbolItemType[]>(["symbols"]);

      const optimisticSymbol: SymbolItemType = {
        _id: uuidv4(),
        ...data,
      };

      queryClient.setQueryData<SymbolItemType[]>(["symbols"], (old) =>
        old ? [...old, optimisticSymbol] : [optimisticSymbol]
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["symbols"], context.previous);
        console.log(`${variables.symbol} 생성 실패: ${(err as Error).message}`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },

    onSuccess: (data) => {
      console.log(`생성 완료, 서버 응답:`, data);
    },
  });

  return mutation;
}
