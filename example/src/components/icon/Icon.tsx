import { HTMLAttributes } from "react";
import { icons } from "lucide-react";

export type IconName = keyof typeof icons; // 아이콘 목록
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

const Icon = ({
  name,
  size = "16px",
  color = "currentColor",
  strokeWidth = "1.75px",
  absoluteStrokeWidth = false,
  className,
}: IconProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    console.warn(`Lucide icon '${name}' does not exist.`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      absoluteStrokeWidth={absoluteStrokeWidth}
      className={className}
    />
  );
};

export default Icon;
