import {
  Tooltip as PrimitiveTooltip,
  type TooltipProps as PrimitiveTooltipProps
} from "@nextui-org/react";
import { clsx } from "clsx";
import { useId } from "react";

interface TooltipProps extends PrimitiveTooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  className,
  ...props
}: TooltipProps) => {
  const id = useId();
  return (
    <PrimitiveTooltip
      key={id}
      showArrow={true}
      content={content}
      className={clsx(
        "bg-gray text-zink p-2 rounded-lg shadow-lg max-w-40 flex items-center border border-zink",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveTooltip>
  );
};
