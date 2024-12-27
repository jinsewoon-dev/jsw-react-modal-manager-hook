import Icon, { IconName } from "@components/icon/Icon";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@shadcn/components/ui/sidebar";
import { cn } from "@shadcn/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarCollapsibleMenuProps {
  categoryData: {
    title: string;
    icon: IconName;
  };
  subMenuData: {
    title: string;
    url: string;
  }[];
}
const SidebarCollapsibleMenu = ({
  categoryData,
  subMenuData,
}: SidebarCollapsibleMenuProps) => {
  const { pathname } = useLocation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="flex justify-between">
          <span className="inline-flex items-center gap-2 text-[14px]">
            {<Icon name={categoryData.icon} />} {categoryData.title}
          </span>
          {/* 메뉴 화살표 아이콘 */}
          {/* <Icon
                name="ChevronRight"
                // rotate 애니메이션
                className={`${
                  open ? "rotate-90" : "rotate-0"
                } transition-transform`}
              /> */}
        </SidebarMenuButton>
        {subMenuData.map((submenu) => {
          const isActive = () => {
            if (submenu.url === "/") {
              return pathname === submenu.url;
            } else {
              return pathname.includes(submenu.url);
            }
          };
          return (
            <SidebarMenuSub key={submenu.title} className={``}>
              <SidebarMenuSubItem>
                <Link
                  to={submenu.url}
                  className={cn(
                    "flex text-[14px]",
                    isActive() ? "text-zinc-900" : "text-zinc-400"
                  )}
                >
                  {submenu.title}
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          );
        })}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarCollapsibleMenu;
