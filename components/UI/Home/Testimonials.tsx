import React from "react";
import TestimonialCard from "@/components/UI/TestimonialCard";
import Button from "../Button";
import { links } from "@/config";
import { testimonials } from "@/config/comments";

const Testimonials = () => {
  return (
    <section>
      <div className="heading text-purple mb-8">
        What our customers has to say
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
      <div className="mt-10 w-full sm:w-80 mx-auto">
        <Button
          className="p-8 text-xl w-full"
          href={links.studio.path}
          withFancyGradient
        >
          Start restoring your photos
        </Button>
      </div>
    </section>
  );
};

export default Testimonials;
