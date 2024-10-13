import {
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react";
import React from "react";
import { Star } from "react-feather";

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({
  name,
  testimonial,
  rating
}: TestimonialCardProps) => {
  return (
    <Card className="w-full bg-gray rounded-2xl p-3 grid grid-rows-[1fr_auto]">
      <CardHeader className="justify-between">
        <div className="mb-4 lg:mb-20 text-2xl font-bold">
          &quot;{testimonial}&quot;
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{name}</span>
          <span className="text-darkzink text-md">subscriber</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 text-yellow-500 ${index < rating ? 'fill-yellow-500' : ''}`}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default TestimonialCard;
