import React from "react";
import TestimonialCard from "@/components/UI/TestimonialCard";
import Button from "../Button";
import { links } from "@/config";

const testimonials = [
  {
    name: "John Doe",
    testimonial:
      "I literally just unblurred my only one high school photo. I cannot believe how easy and great it is",
    rating: 5
  },
  {
    name: "Jane Doe",
    testimonial:
      "The utility-first approach and extensive component library make it a breeze to create beautiful and responsive interfaces. 🎉",
    rating: 5
  },
  {
    name: "Jim Doe",
    testimonial:
      "It's like having a superpower in your toolkit. The ability to craft custom designs quickly and efficiently with simple classes is unparalleled.",
    rating: 4
  }
];

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
