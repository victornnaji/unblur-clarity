import React from "react";
import { CardBody, CardHeader, Card } from "@nextui-org/react";

const AccountCard = ({
  header,
  children,
}: {
  header: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Card radius="sm" className="w-full h-full bg-gray border-1">
      <CardHeader className="font-semibold">{header}</CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default AccountCard;
