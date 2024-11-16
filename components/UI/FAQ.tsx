"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface FaqProps {
  contents: {
    question: string;
    answer: string | React.ReactNode;
  }[];
  title?: string;
}

const Faq = ({ contents, title = "Frequently Asked Questions" }: FaqProps) => {
  return (
    <section>
      <h2 className="heading">{title}</h2>
      <div className="mt-6">
        <Accordion variant="splitted" className="px-0 lg:w-2/3 w-full mx-auto">
          {contents.map((content, index) => (
            <AccordionItem
              key={index}
              aria-label={`Question ${index + 1}`}
              title={content.question}
              classNames={{
                base: "bg-zinc-800",
                title: "text-zinc-50",
                content: "text-zinc-50"
              }}
            >
              <span className="text-zink">{content.answer}</span>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
