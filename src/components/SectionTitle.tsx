import Separator from "@/components/Separator";

interface SectionTitleProps {
  number?: string;
  title: string;
  endTitle?: string;
}

export default function SectionTitle({
  number,
  title,
  endTitle,
}: SectionTitleProps) {
  return (
    <>
      <div className="flex justify-between items-center p-2 text-md-on-secondary-container">
        <div className="font-cherry text-md">
          <span>{number} / </span>
          <span>{title}</span>
        </div>
        <span className="text-sm">{endTitle}</span>
      </div>
      <Separator />
    </>
  );
}
