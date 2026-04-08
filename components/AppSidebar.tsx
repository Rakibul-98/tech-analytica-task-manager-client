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
import { CheckCheck, LogOut, Monitor, Users2, Workflow } from "lucide-react"
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Monitor,
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: Workflow,
      },
      {
        title: "Audit Logs",
        url: "/audit-logs",
        icon: CheckCheck,
      },
      {
        title: "User Management",
        url: "/user-management",
        icon: Users2,
      }
    ]
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const isActive = (url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar collapsible="icon" {...props} className="border-none shadow-lg bg-gray-50">
      <SidebarHeader>
        Task Manager
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    className={`transition-colors cursor-pointer ${isActive(item.url)
                      ? "bg-gray-300 dark:bg-gray-800 font-semibold hover:bg-gray-300"
                      : "hover:bg-gray-300 dark:hover:bg-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className={isActive(item.url) ? "text-primary" : ""} />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </div>
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