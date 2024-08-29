"use client";

import React, { useEffect, useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { ToastVariants } from "@/types";

const DURATION = 15000;

const HotToast = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const id = useId();

  useEffect(() => {
    const status = searchParams.get("status");
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    if (status || title || description) {
      toast[status as ToastVariants](
        <ToastMessage title={title} description={description} />,
        {
          id: status || id,
          duration: DURATION,
          position: "bottom-right"
        }
      );

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
      {title && <span className="text-base font-bold px-2">{title}</span>}
      {description && <span className="text-sm">{description}</span>}
    </aside>
  )
);

export default React.memo(HotToast);
