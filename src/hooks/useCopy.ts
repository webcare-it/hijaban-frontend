import { useState } from "react";
import toast from "react-hot-toast";

interface CopiedIds {
  [key: string]: boolean;
}

export const useCopyToClipboard = (successText?: string) => {
  const [copiedIds, setCopiedIds] = useState<CopiedIds>({});

  const copyToClipboard = (id: string) => {
    if (!id) return;

    navigator.clipboard
      .writeText(id.toString())
      .then(() => {
        setCopiedIds((prev) => ({ ...prev, [id]: true }));
        toast.success(successText || "Copied to clipboard!");

        setTimeout(() => {
          setCopiedIds((prev) => ({ ...prev, [id]: false }));
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return { copiedIds, copyToClipboard };
};
