import {
  Tooltip as PrimitiveTooltip,
  type TooltipProps as PrimitiveTooltipPropsƒ
} from "@nextui-org/react";
import { useId } from "react";

interface TooltipProps extends PrimitiveTooltipPropsƒ {
  children: React.ReactNode;
  content: string;
}

export const Tooltip = ({ children, content, ...props }: TooltipProps) => {
  const id = useId();
  return (
    <PrimitiveTooltip
      key={id}
      showArrow={true}
      content={content}
      className="bg-gray text-zink p-2 rounded-lg shadow-lg max-w-40 flex items-center border border-zink"
      {...props}
    >
      {children}
    </PrimitiveTooltip>
  );
};
