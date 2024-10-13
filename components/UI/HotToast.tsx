"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { ToastVariants } from "@/types";

const DURATION = 15000;

const HotToast = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    if (status || title || description) {
      showToast(status as ToastVariants, title, description);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        "status",
        "title",
        "description",
        "disable_button"
      ];
      paramsToRemove.forEach((param) => newSearchParams.delete(param));
      const redirectPath = `${pathname}?${newSearchParams.toString()}`;
      router.replace(redirectPath, { scroll: false });
    }
  }, [searchParams]);

  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            border: "2px solid var(--success)",
            boxShadow: `inset 0 0 5px green`
          }
        },
        error: {
          style: {
            border: "1px solid var(--error)",
            boxShadow: `inset 0 0 5px red`
          }
        }
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="absolute right-2.5 top-2.5 font-bold cursor-pointer w-7 flex justify-end"
                >
                  X<span className="sr-only">Close Notification</span>
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

const ToastMessage = React.memo(
  ({
    title,
    description
  }: {
    title: string | null;
    description: string | null;
  }) => (
    <aside className="flex flex-col">
      {title && <span className="text-base font-bold pr-2">{title}</span>}
      {description && <span className="text-sm">{description}</span>}
    </aside>
  )
);

export const showToast = (
  status: ToastVariants,
  title: string | null,
  description: string | null,
  id?: string
) => {
  toast[status](<ToastMessage title={title} description={description} />, {
    id: id || status,
    duration: DURATION,
    position: "bottom-right"
  });
};

export default React.memo(HotToast);
