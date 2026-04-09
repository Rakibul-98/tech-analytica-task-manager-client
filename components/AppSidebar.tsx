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
import { CheckSquare, LogOut, Monitor, ShieldCogCorner, Users2, Workflow } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

// ... imports remain the same

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  const navMain = [
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
    ...(isAdmin ? [
      {
        title: "Audit Log",
        url: "/audit-log",
        icon: ShieldCogCorner,
      },
      {
        title: "Users",
        url: "/users",
        icon: Users2,
      }
    ] : [])
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const isActive = (url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      <SidebarHeader className=" py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
            <CheckSquare size={16} className="text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-sidebar-foreground">TaskFlow</p>
            <p className="text-xs text-sidebar-foreground/50">{isAdmin ? "Admin" : "Member"}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    className={`
                      h-10 rounded-lg transition-all duration-150 cursor-pointer
                      ${isActive(item.url)
                        ? "bg-indigo-500 text-white hover:bg-indigo-500"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }
                    `}
                  >
                    <item.icon size={17} />
                    <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4 border-t border-sidebar-border">
        <div className="group-data-[collapsible=icon]:hidden mb-3 px-2">
          <p className="text-xs font-medium text-sidebar-foreground truncate">{user?.name}</p>
          <p className="text-xs text-sidebar-foreground/40 truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 justify-center py-2 rounded-lg text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-150 cursor-pointer"
        >
          <LogOut size={16} />
          <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}