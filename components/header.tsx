type HeaderProps = {
  header: string;
  desc: string;
};

export const Header = ({ header, desc }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 mt-10 sm:mt-20">
      <h1 className="font-sketch font-medium tracking-tight text-green-2 text-6xl sm:text-pri">{header}</h1>
      <p className="font-sans text-green-2/40 text-ter">{desc}</p>
    </div>
  );
};