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
import { LogOut, SquareTerminal } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

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
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 justify-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <span><LogOut size={16} /></span>
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}