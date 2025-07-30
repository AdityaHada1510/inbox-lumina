import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Filter, PieChart, TrendingUp, Mail, Star, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [urgency, setUrgency] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange({ dateRange: range, urgency, sentiment, category });
  };

  const handleUrgencyChange = (value: string) => {
    setUrgency(value);
    onFilterChange({ dateRange, urgency: value, sentiment, category });
  };

  const handleSentimentChange = (value: string) => {
    setSentiment(value);
    onFilterChange({ dateRange, urgency, sentiment: value, category });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ dateRange, urgency, sentiment, category: value });
  };

  const clearFilters = () => {
    setDateRange(undefined);
    setUrgency("");
    setSentiment("");
    setCategory("");
    onFilterChange({ dateRange: undefined, urgency: "", sentiment: "", category: "" });
  };

  // Mock data for pie chart
  const emailStats = [
    { label: "Inbox", count: 42, color: "hsl(248 75% 70%)" },
    { label: "Promotions", count: 28, color: "hsl(190 100% 70%)" },
    { label: "Social", count: 15, color: "hsl(142 71% 45%)" },
    { label: "Updates", count: 12, color: "hsl(38 92% 50%)" }
  ];

  const totalEmails = emailStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="w-80 glass-sidebar p-6 overflow-y-auto">
      {/* Quick Stats */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold gradient-text">Quick Stats</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="glass-heavy p-3 text-center hover-lift">
          <Mail className="w-6 h-6 text-primary mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{totalEmails}</div>
          <div className="text-xs text-subtext">Total</div>
        </Card>
        <Card className="glass-heavy p-3 text-center hover-lift">
          <Star className="w-6 h-6 text-warning mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">8</div>
          <div className="text-xs text-subtext">Starred</div>
        </Card>
        </div>

        {/* Simple Pie Chart Visualization */}
        <Card className="glass-heavy p-4">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-sidebar-foreground">Categories</h3>
          </div>
          <div className="space-y-2">
            {emailStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-sm text-subtext">{stat.label}</span>
                </div>
                <span className="text-sm font-medium text-sidebar-foreground">{stat.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold gradient-text">Filters</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="ml-auto text-xs text-subtext hover:text-foreground"
          >
            Clear All
          </Button>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-sidebar-foreground">Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal glass-input",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-sidebar-background border-white/20" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Urgency Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-sidebar-foreground">Urgency</Label>
          <Select value={urgency} onValueChange={handleUrgencyChange}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-background border-white/20">
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sentiment Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-sidebar-foreground">Sentiment</Label>
          <Select value={sentiment} onValueChange={handleSentimentChange}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select sentiment" />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-background border-white/20">
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-sidebar-foreground">Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-background border-white/20">
              <SelectItem value="inbox">Inbox</SelectItem>
              <SelectItem value="promotions">Promotions</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="updates">Updates</SelectItem>
              <SelectItem value="forums">Forums</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(urgency || sentiment || category || dateRange?.from) && (
          <div className="pt-4 border-t border-white/10">
            <Label className="text-sm font-medium text-sidebar-foreground mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {urgency && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Urgency: {urgency}
                </Badge>
              )}
              {sentiment && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Sentiment: {sentiment}
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Category: {category}
                </Badge>
              )}
              {dateRange?.from && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Date Range
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};