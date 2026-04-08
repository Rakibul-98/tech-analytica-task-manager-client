import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { SquareTerminal } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
    ]
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-none shadow-lg">
      <SidebarHeader>
        Task Manager
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem >
                  <SidebarMenuButton className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        Logout
      </SidebarFooter>
    </Sidebar>
  )
}