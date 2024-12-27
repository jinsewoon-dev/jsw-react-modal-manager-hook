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
import SidebarCollapsibleMenu from "./components/SidebarCollapsibleMenu";

type MenuBasicType = {
  title: string;
  url: string;
};

type MenuItemType = {
  icon: IconName;
  children?: MenuBasicType[];
} & MenuBasicType;

const items: MenuItemType[] = [
  {
    title: "Introduction",
    url: ROUTER_PATHS.INTRO,
    icon: "House",
  },
  {
    title: "Tutorials",
    url: ROUTER_PATHS.BASIC,
    icon: "Plus",
    children: [
      {
        title: "Basic",
        url: ROUTER_PATHS.BASIC,
      },
      {
        title: "Nest",
        url: ROUTER_PATHS.NEST,
      },
      {
        title: "Motion",
        url: ROUTER_PATHS.FRAMER_MOTION,
      },
    ],
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
              {items.map((item) => {
                if (item.children) {
                  return (
                    <SidebarCollapsibleMenu
                      key={item.title}
                      categoryData={{
                        title: item.title,
                        icon: item.icon,
                      }}
                      subMenuData={item.children}
                    />
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <Icon name={item.icon} />

                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
