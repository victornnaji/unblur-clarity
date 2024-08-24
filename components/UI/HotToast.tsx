"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast, Toaster, ToastBar } from "react-hot-toast";

const DURATION = 20000;

export type ToastVariants = "success" | "error";

const HotToast = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const id = React.useId();

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
          position: "bottom-right",
        }
      );

      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        "status",
        "title",
        "description",
        "disable_button",
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
            border: "2px solid green",
            boxShadow: "inset 0 0 5px green",
          },
        },
        error: {
          style: {
            border: "1px solid red",
            boxShadow: "inset 0 0 5px red",
          },
        },
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
    description,
  }: {
    title: string | null;
    description: string | null;
  }) => (
    <aside className="flex flex-col">
      {title && <span className="text-base font-bold">{title}</span>}
      {description && <span className="text-sm">{description}</span>}
    </aside>
  )
);

export default React.memo(HotToast);
