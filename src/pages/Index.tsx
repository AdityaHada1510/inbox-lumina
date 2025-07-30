import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmailCard } from "@/components/EmailCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SmartSearch } from "@/components/SmartSearch";
import { InsightsTab } from "@/components/InsightsTab";
import { Search, Mail, Brain, BarChart3, Settings } from "lucide-react";
import backgroundImage from "@/assets/fantasy-background.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  // Mock email data
  const mockEmails = [
    {
      id: "1",
      sender: "Sarah Johnson",
      subject: "Q4 Marketing Strategy Review - Urgent",
      preview: "Hi team, I need your input on the Q4 marketing strategy. The budget allocation needs to be finalized by tomorrow. Please review the attached documents and let me know your thoughts...",
      timestamp: "2 hours ago",
      urgency: "high" as const,
      sentiment: "neutral" as const,
      category: "inbox",
      isStarred: true,
      isRead: false
    },
    {
      id: "2",
      sender: "Alex Chen",
      subject: "Great job on the presentation!",
      preview: "Your presentation yesterday was fantastic. The client was really impressed with the creative approach. Looking forward to working on the next phase of the project...",
      timestamp: "5 hours ago",
      urgency: "low" as const,
      sentiment: "positive" as const,
      category: "inbox",
      isRead: true
    },
    {
      id: "3",
      sender: "Microsoft Teams",
      subject: "Meeting reminder: Weekly standup",
      preview: "Your meeting 'Weekly standup' will start in 30 minutes. Join the meeting by clicking the link below...",
      timestamp: "30 min ago",
      urgency: "medium" as const,
      sentiment: "neutral" as const,
      category: "updates",
      isRead: false
    },
    {
      id: "4",
      sender: "LinkedIn",
      subject: "You have 3 new connection requests",
      preview: "John Smith, Maria Garcia, and David Wilson would like to connect with you on LinkedIn. View their profiles and accept their invitations...",
      timestamp: "1 day ago",
      urgency: "low" as const,
      sentiment: "positive" as const,
      category: "social",
      isRead: true
    },
    {
      id: "5",
      sender: "Jennifer Williams",
      subject: "Project deadline concerns",
      preview: "I'm concerned about meeting the project deadline. We're facing some technical challenges that might delay the delivery. Can we schedule a quick call to discuss?",
      timestamp: "3 hours ago",
      urgency: "high" as const,
      sentiment: "negative" as const,
      category: "inbox",
      isRead: false
    }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(/lovable-uploads/81f7e427-94a0-4fe4-b7f0-cd1ec8228b2f.png)` }}
    >
      {/* Overlay for better text readability */}
      <div className="min-h-screen bg-background/60 backdrop-blur-sm">
        <div className="flex">
          {/* Sidebar */}
          <FilterSidebar onFilterChange={handleFilterChange} />
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-2">
                    Email Insights AI
                  </h1>
                  <p className="text-subtext text-lg">
                    Intelligently manage and understand your inbox with AI-powered insights
                  </p>
                </div>
                <Button variant="outline" size="icon" className="glass-input">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Search */}
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Quick search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="emails" className="space-y-6">
              <TabsList className="glass-heavy h-12 p-1">
                <TabsTrigger value="emails" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  All Emails
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Smart Search
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Insights
                </TabsTrigger>
              </TabsList>

              {/* All Emails Tab */}
              <TabsContent value="emails" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Your Emails ({mockEmails.length})
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {mockEmails.map((email) => (
                    <EmailCard key={email.id} {...email} />
                  ))}
                </div>
              </TabsContent>

              {/* Smart Search Tab */}
              <TabsContent value="search">
                <SmartSearch />
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights">
                <InsightsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
