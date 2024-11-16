const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">Sidebar</div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default layout;
