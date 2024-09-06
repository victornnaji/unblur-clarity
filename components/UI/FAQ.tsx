"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface FaqProps {
  contents: {
    question: string;
    answer: string;
  }[];
  title?: string;
}

const Faq = ({ contents, title = "Frequently Asked Questions" }: FaqProps) => {
  return (
    <div className="mb-10">
      <div className="mt-20"></div>
      <h2 className="text-2xl font-semibold text-zink text-center">{title}</h2>
      <div className="mt-6">
        <Accordion variant="splitted" className="px-0 md:w-[50%] mx-auto">
          {contents.map((content, index) => (
            <AccordionItem
              key={index}
              aria-label={`Question ${index + 1}`}
              title={content.question}
              classNames={{
                base: "bg-zinc-800",
                title: "text-zinc-50",
                content: "text-zinc-50",
              }}
            >
              {content.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
