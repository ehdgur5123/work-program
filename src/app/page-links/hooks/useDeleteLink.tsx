"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToURL } from "@/app/page-links/controllers/axiosLink";
import { PaginatedLinkResponse } from "@/app/page-links/types";
import { toast } from "react-hot-toast";

export default function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteToURL(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });

      const previous = queryClient.getQueryData<PaginatedLinkResponse>([
        "links",
      ]);

      queryClient.setQueryData<PaginatedLinkResponse>(["links"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((link) => link._id !== id),
        };
      });

      return { previous };
    },
    onError: (err, id, context) => {
      // 실패 시 기존 데이터 복원
      if (context?.previous) {
        queryClient.setQueryData(["links"], context.previous);
      }
      toast.error("❌ 삭제 실패");
    },
    onSuccess: () => {
      toast.success("✅ 삭제 완료");
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });
}
