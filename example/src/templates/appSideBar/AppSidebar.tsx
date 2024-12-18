import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shadcn/components/ui/sidebar";
import { ROUTER_PATHS } from "@constants/ROUTER_PATHS";

import Icon, { IconName } from "@components/icon/Icon";

type MenuItemType = {
  title: string;
  url: string;
  icon: IconName;
};

const items: MenuItemType[] = [
  {
    title: "Introduction",
    url: ROUTER_PATHS.INTRO,
    icon: "House",
  },
  {
    title: "Tutorials",
    url: ROUTER_PATHS.BASIC,
    icon: "Inbox",
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Icon name={item.icon} />

                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
