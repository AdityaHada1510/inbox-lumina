import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, AlertTriangle, BarChart3, Calendar } from "lucide-react";

export const InsightsTab = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "Email Volume Trend",
      description: "Email volume increased by 23% this week",
      value: "+23%",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Top Senders",
      description: "Most emails from internal team members",
      value: "67%",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "Average response time improved",
      value: "2.3h",
      color: "text-warning"
    },
    {
      icon: AlertTriangle,
      title: "Urgent Emails",
      description: "High priority emails require attention",
      value: "12",
      color: "text-destructive"
    }
  ];

  const weeklyData = [
    { day: "Mon", emails: 32, urgent: 4 },
    { day: "Tue", emails: 28, urgent: 2 },
    { day: "Wed", emails: 45, urgent: 7 },
    { day: "Thu", emails: 38, urgent: 3 },
    { day: "Fri", emails: 42, urgent: 5 },
    { day: "Sat", emails: 15, urgent: 1 },
    { day: "Sun", emails: 8, urgent: 0 }
  ];

  const maxEmails = Math.max(...weeklyData.map(d => d.emails));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold gradient-text">Email Insights</h2>
        </div>
        <p className="text-subtext max-w-2xl mx-auto">
          Get AI-powered insights about your email patterns, productivity trends, and communication habits.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="glass-card p-6 hover-lift">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Icon className={`w-6 h-6 ${insight.color}`} />
                  <h3 className="font-semibold text-foreground">{insight.title}</h3>
                  <p className="text-sm text-subtext">{insight.description}</p>
                </div>
                <div className={`text-2xl font-bold ${insight.color}`}>
                  {insight.value}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly Activity Chart */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Weekly Activity</h3>
        </div>
        
        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm text-subtext font-medium">{day.day}</div>
              <div className="flex-1 relative">
                <div className="h-8 bg-muted/20 rounded-md overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-md transition-all duration-300"
                    style={{ width: `${(day.emails / maxEmails) * 100}%` }}
                  />
                  {day.urgent > 0 && (
                    <div 
                      className="absolute top-0 right-0 h-full bg-destructive/70 rounded-r-md"
                      style={{ width: `${(day.urgent / day.emails) * 100}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground font-medium w-8">{day.emails}</span>
                {day.urgent > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {day.urgent} urgent
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-primary rounded"></div>
            <span className="text-sm text-subtext">Total Emails</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded"></div>
            <span className="text-sm text-subtext">Urgent Emails</span>
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
            <TrendingUp className="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">Optimize Response Times</h4>
              <p className="text-sm text-subtext">Consider setting up email templates for common responses to reduce average response time.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">High Priority Backlog</h4>
              <p className="text-sm text-subtext">You have 12 high-priority emails. Consider addressing these first to improve workflow.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">Communication Pattern</h4>
              <p className="text-sm text-subtext">Most productive email hours: 9-11 AM and 2-4 PM. Schedule important communications during these times.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};