import React from "react";
import TestimonialCard from "@/components/UI/TestimonialCard";

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
    <>
      <div className="text-4xl font-extrabold text-center text-purple mb-8">
        What our customers has to say
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </>
  );
};

export default Testimonials;
