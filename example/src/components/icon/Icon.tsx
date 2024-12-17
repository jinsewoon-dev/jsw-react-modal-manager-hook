import { HTMLAttributes } from "react";
import { icons } from "lucide-react";

export type IconName = keyof typeof icons; // 아이콘 목록
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: number;
}

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    console.warn(`Lucide icon '${name}' does not exist.`);
    return null;
  }

  return <LucideIcon size={size} color={color} className={className} />;
};

export default Icon;
