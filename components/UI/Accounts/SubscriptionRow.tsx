export const SubsciptionRow = ({
  title,
  description,
}: {
  title: string;
  description: string | React.ReactNode;
}) => {
  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-darkzink text-sm items-center">
      <dt className="font-medium">{title}</dt>
      <dd className="mt-2 text-zink">{description}</dd>
    </div>
  );
};
