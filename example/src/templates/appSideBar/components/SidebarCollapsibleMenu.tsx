import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shadcn/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@shadcn/components/ui/sidebar";
import { ArrowDown, ArrowUp, LucideProps } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarCollapsibleMenuProps {
  categoryData: {
    title: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
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
  const [open, setOpen] = useState<boolean>(true);
  return (
    <SidebarMenu>
      <Collapsible
        defaultOpen
        open={open}
        onOpenChange={setOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex justify-between">
              <span>
                {<categoryData.icon />} {categoryData.title}
              </span>{" "}
              {open ? <ArrowUp /> : <ArrowDown />}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {subMenuData.map((submenu) => {
              return (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link to={submenu.url}>{submenu.title}</Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              );
            })}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export default SidebarCollapsibleMenu;
