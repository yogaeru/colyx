import { cn } from "cn";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className={cn(
        "flex flex-row justify-center",
        "bg-background/10 backdrop-blur-xl",
        "border-b-2",
        "sticky top-0 z-1000",
      )}>
      <div className="h-full section border-2 border-b-0 p-3">
        <a href="/" className="">
          <span className="font-bold">SVAELA</span>
        </a>
      </div>
    </nav>
  );
}
