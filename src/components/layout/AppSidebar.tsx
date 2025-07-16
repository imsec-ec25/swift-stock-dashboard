import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  PackageCheck,
  Truck,
  FileText,
  BarChart3
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: Package,
  },
  {
    title: 'Receiving',
    url: '/receiving',
    icon: PackageCheck,
  },
  {
    title: 'Dispatch',
    url: '/dispatch',
    icon: Truck,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-border/50`} collapsible="icon">
      <SidebarContent className="bg-card/30 backdrop-blur-sm">
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-soft">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-foreground text-lg">InvenTrack</h2>
                <p className="text-xs text-muted-foreground font-medium">Government System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-6">
          <SidebarGroupLabel className="text-muted-foreground font-medium text-xs uppercase tracking-wide px-3 mb-2">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-soft scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                        }`
                      }
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : ''} transition-transform group-hover:scale-110`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                      {!collapsed && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-30 transition-opacity" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}