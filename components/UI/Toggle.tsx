import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

interface ToggleProps {
  initialState: boolean;
  onToggle: (state: boolean) => void;
  className?: string;
  leftText?: string;
  rightText?: string;
}

export default function Toggle({
  initialState,
  onToggle,
  className,
  leftText,
  rightText
}: ToggleProps) {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleClick = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState);
  };

  return (
    <div className="flex items-center justify-center">
      {leftText && <ToggleText text={leftText} isActive={!isToggled} />}
      <div
        className={clsx(
          isToggled ? "justify-end bg-purple" : "bg-zink",
          "flex h-8 w-16 cursor-pointer items-center rounded-full px-1 border border-purple-200",
          className
        )}
        onClick={handleClick}
      >
        <motion.div
          className="h-6 w-6 rounded-full bg-zinc-800"
          layout
          transition={spring}
        />
      </div>
      {rightText && <ToggleText text={rightText} isActive={isToggled} />}
    </div>
  );
}

const ToggleText = ({
  text,
  isActive
}: {
  text: string;
  isActive: boolean;
}) => {
  return isActive ? (
    <span className="text-foreground">{text}</span>
  ) : (
    <span className="text-zink opacity-65">{text}</span>
  );
};
