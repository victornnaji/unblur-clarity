import React from "react";

const Credits = ({ credits }: { credits: number }) => {
  return (
    <div className="py-2 text-sm border-gray border-3 text-zink text-center mb-3">
      <span>Credits:</span> <span className="font-bold">{credits} 💰</span>
    </div>
  );
};

export default Credits;
