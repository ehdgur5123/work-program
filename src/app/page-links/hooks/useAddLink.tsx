"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postToURL } from "../controllers/axiosLink";

interface LinkType {
  URL: string;
  large: string;
  medium: string;
  small: string;
}

export default function useAddLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLink: LinkType) => postToURL(newLink),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
