"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchToURL } from "../controllers/axiosLink";
import { PaginatedLinkResponse, LinkItem } from "../types";
import { toast } from "react-hot-toast"; // 필요시 설치: react-hot-toast

export interface UpdateLinkInput {
  _id: string;
  title?: string;
  content?: string;
  category?: {
    large?: string;
    medium?: string;
    small?: string;
  };
}

export default function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: UpdateLinkInput) =>
      patchToURL(updatedData as LinkItem), // LinkItem 전체로 patch

    // Optimistic Update
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });

      const previous = queryClient.getQueryData<PaginatedLinkResponse>([
        "links",
      ]);

      queryClient.setQueryData<PaginatedLinkResponse>(
        ["links"],
        (
          old: PaginatedLinkResponse | undefined
        ): PaginatedLinkResponse | undefined => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((link) =>
              link._id === updatedData._id
                ? ({ ...link, ...updatedData } as LinkItem)
                : link
            ),
          };
        }
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      // 롤백
      if (context?.previous) {
        queryClient.setQueryData(["links"], context.previous);
      }
      toast.error("수정에 실패하였습니다");
    },

    onSuccess: (updatedLink: LinkItem) => {
      // 서버 응답으로 최신 데이터 받으면 캐시에 반영
      queryClient.setQueryData<PaginatedLinkResponse>(["links"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((link) =>
            link._id === updatedLink._id ? updatedLink : link
          ),
        };
      });
      toast.success("수정이 완료되었습니다");
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] }); // 확실히 동기화
    },
  });
}
