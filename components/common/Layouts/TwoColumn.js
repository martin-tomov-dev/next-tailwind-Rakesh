export function TwoColumnLeft({ children }) {
  return (
    <div className="w-full pt-[77px] pb-[84px] px-[27px] tablet:h-screen tablet:overflow-scroll no-scrollbar">
      <div className="tablet:max-w-[502px] desktop:max-w-[500px] m-auto">
        {children}
      </div>
    </div>
  );
}

export function TwoColumnRight({ children }) {
  return (
    <div className="h-screen w-full relative hidden tablet:block">
      {children}
    </div>
  );
}
