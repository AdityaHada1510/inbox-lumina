import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Clock, User, Star } from "lucide-react";

interface EmailCardProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  urgency: "high" | "medium" | "low";
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  isStarred?: boolean;
  isRead?: boolean;
}

export const EmailCard = ({
  sender,
  subject,
  preview,
  timestamp,
  urgency,
  sentiment,
  category,
  isStarred,
  isRead = false
}: EmailCardProps) => {
  const urgencyColors = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-warning/20 text-warning border-warning/30",
    low: "bg-success/20 text-success border-success/30"
  };

  const sentimentColors = {
    positive: "bg-success/20 text-success border-success/30",
    negative: "bg-destructive/20 text-destructive border-destructive/30",
    neutral: "bg-muted/20 text-muted-foreground border-muted/30"
  };

  return (
    <Card className="glass-card p-6 hover-lift cursor-pointer group transition-all duration-300 hover:shadow-glow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-card-foreground truncate ${
                !isRead ? "text-foreground" : "text-card-foreground"
              }`}>
                {sender}
              </h3>
              {isStarred && (
                <Star className="w-4 h-4 text-warning fill-warning" />
              )}
            </div>
            <p className={`text-sm truncate ${
              !isRead ? "text-foreground font-medium" : "text-subtext"
            }`}>
              {subject}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-subtext">
          <Clock className="w-3 h-3" />
          {timestamp}
        </div>
      </div>

      <p className="text-subtext text-sm mb-4 line-clamp-2">
        {preview}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="outline" className={urgencyColors[urgency]}>
            {urgency}
          </Badge>
          <Badge variant="outline" className={sentimentColors[sentiment]}>
            {sentiment}
          </Badge>
          <Badge variant="outline" className="border-white/20 text-subtext">
            {category}
          </Badge>
        </div>

        <Button 
          size="sm" 
          variant="ghost" 
          className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary-glow hover:bg-primary/10"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          Summarize
        </Button>
      </div>
    </Card>
  );
};