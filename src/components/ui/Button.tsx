import { M3eButton } from "@m3e/react/button";
import type { ButtonShape, ButtonSize, ButtonVariant } from "@m3e/react/button";

interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "filled",
  size = "small",
  shape = "rounded",
  onClick,
  children,
  className,
}: ButtonProps) {
  return (
    <M3eButton
      variant={variant}
      size={size}
      shape={shape}

      className={className}
      onClick={onClick}
    >
      {children}
    </M3eButton>
  );
}
