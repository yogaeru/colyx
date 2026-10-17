import { cn } from "cn";
import { useEffect, useState } from "react";

type TitleProps = {
  title: string;
  number?: string;
  subtitle?: string;
  className?: string;
};

export default function Title({
  title,
  number,
  subtitle,
  className,
}: TitleProps) {
  const [navbarHeight, setNavbarHeight] = useState(0);
  useEffect(() => {
    setNavbarHeight(document.getElementById("navbar")?.offsetHeight ?? 0);
  }, []);

  return (
    <div
      className={cn(
        "text-ring",
        "flex flex-row items-center justify-between",
        "w-full backdrop-blur-xl bg-background/10",
        "py-1.5 md:py-2.5 px-4 md:px-6 lg:px-8",
        "border-b-2 border-boder",
        // `sticky z-10`,
        className,
      )}
      style={{
        top: navbarHeight,
      }}
    >
      <p className="font-medium text-sm gap-3 flex flex-row items-center">
        {number && (
          <>
            <span className=" font-bold">{number}</span>
            <span className=" font-bold">/</span>
          </>
        )}
        {title}
      </p>
      {subtitle && (
        <span className="hidden sm:inline font-medium text-sm">{subtitle}</span>
      )}
    </div>
  );
}
