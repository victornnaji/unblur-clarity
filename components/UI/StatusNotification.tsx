"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const StatusNotification = ({ message }: { message: string }) => {
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    setDisplayMessage(message);
  }, [message]);

  return (
    <div
      className="flex flex-col w-full items-center mt-4 text-center justify-center"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "22px"
      }}
    >
      <AnimatePresence>
        <motion.span
          className="inline-block w-full text-center relative"
          key={displayMessage}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          {displayMessage}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default StatusNotification;
