"use client";

import React, { useEffect, useId, useRef, useState } from "react";

const IsInView = ({
  children,
  threshold = 0.5,
  rootMargin = "0px"
}: {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} id={id}>
      {isVisible && children}
    </div>
  );
};

export default IsInView;
