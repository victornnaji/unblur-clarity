import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function Toggle({
  initialState,
  onToggle,
  className,
}: {
  initialState: boolean;
  onToggle: (state: boolean) => void;
  className?: string;
}) {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleClick = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState);
  };

  return (
    <div
      className={clsx(
        isToggled ? "justify-end bg-gray-900" : "bg-gray-300",
        "flex h-8 w-16 cursor-pointer items-center rounded-full px-1",
        className
      )}
      onClick={handleClick}
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-white"
        layout
        transition={spring}
      />
    </div>
  );
}
