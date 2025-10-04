"use client";

import { useEffect, useState } from "react";
import { useMessageStore } from "@/app/symbols/stores/useMessageStore";

export default function Message() {
  const { message } = useMessageStore();
  const [color, setColor] = useState("");

  useEffect(() => {
    if (message.state === "success") {
      setColor("text-green-600");
    } else if (message.state === "warning") {
      setColor("text-yellow-600");
    } else if (message.state === "error") {
      setColor("text-red-600");
    } else {
      setColor("");
    }
  }, [message]);

  return <div className={`text-center ${color}`}>{message.text}</div>;
}
