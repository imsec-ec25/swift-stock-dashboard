import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-primary'
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Monthly Dispatch',
      value: '1,394',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Total Value',
      value: '$847K',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-accent'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Material Received', item: 'Office Supplies Batch #OS-2024-001', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Dispatch Created', item: 'Medical Equipment to Kampala', time: '4 hours ago', status: 'pending' },
    { id: 3, action: 'Stock Alert', item: 'Printer Paper - Low Stock', time: '6 hours ago', status: 'warning' },
    { id: 4, action: 'Material Received', item: 'Computers Batch #CP-2024-034', time: '1 day ago', status: 'completed' },
  ];

  const categoryDistribution = [
    { name: 'Office Supplies', value: 35, color: 'bg-primary' },
    { name: 'Medical Equipment', value: 25, color: 'bg-success' },
    { name: 'IT Equipment', value: 20, color: 'bg-accent' },
    { name: 'Furniture', value: 15, color: 'bg-warning' },
    { name: 'Other', value: 5, color: 'bg-muted' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Overview of your inventory management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.title}</p>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="flex items-center text-sm">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-success font-medium' : 'text-destructive font-medium'}>
                      {stat.change}
                    </span>
                    <span className="ml-1 text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="hover:shadow-medium transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-base">
              Latest inventory movements and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/30">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'completed' ? 'default' : 
                      activity.status === 'warning' ? 'destructive' : 'secondary'
                    }
                  >
                    {activity.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {activity.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {activity.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="hover:shadow-medium transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              Category Distribution
            </CardTitle>
            <CardDescription className="text-base">
              Inventory breakdown by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categoryDistribution.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">{category.name}</span>
                    <span className="text-lg font-bold text-primary">{category.value}%</span>
                  </div>
                  <Progress value={category.value} className="h-3 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;