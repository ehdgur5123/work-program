import { useQuery } from "@tanstack/react-query";
import { getSymbols } from "@/app/symbols/controllers/axiosSymbols";
import { SymbolItemType } from "@/app/symbols/types";

export default function useGetSymbols() {
  const {
    data: symbolItemList,
    isLoading: isSymbolLoading,
    isFetching: isSymbolFetching,
    isError: isSymbolError,
  } = useQuery<SymbolItemType[]>({
    queryKey: ["symbols"],
    queryFn: getSymbols,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  return {
    symbolItemList,
    isSymbolLoading,
    isSymbolFetching,
    isSymbolError,
  };
}
