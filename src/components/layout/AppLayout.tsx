import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-muted rounded-lg p-2 transition-colors" />
              <div className="h-6 w-px bg-border/50" />
              <h1 className="text-lg font-semibold text-foreground">Inventory Management System</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 border border-border/30">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{user?.username}</span>
                <div className="h-4 w-px bg-border/50" />
                <span className="text-xs text-muted-foreground">{user?.role}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-8 bg-gradient-to-br from-background via-background to-muted/30">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;