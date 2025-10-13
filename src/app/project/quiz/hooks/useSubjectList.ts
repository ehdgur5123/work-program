import { useQuery } from "@tanstack/react-query";
import { getSubjectList } from "@/app/project/quiz/controllers/axiosQuiz";
import { useSubjectStore } from "@/app/project/quiz/stores/useSubjectStore";
import { useEffect } from "react";

export default function useSubjectList() {
  const setSubjectList = useSubjectStore((state) => state.setSubjectList);

  const {
    data,
    isLoading: isSubjectListLoading,
    isError: isSubjectListError,
  } = useQuery<string[]>({
    queryKey: ["subjectList"],
    queryFn: getSubjectList,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSubjectList(data ?? []);
  }, [data, setSubjectList]);

  return {
    isSubjectListLoading,
    isSubjectListError,
  };
}
