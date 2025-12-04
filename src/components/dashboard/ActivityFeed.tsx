import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, AlertTriangle, CheckCircle, Mic, User } from "lucide-react";

const mockActivities = [
  {
    type: "upload",
    user: "John Doe",
    action: "uploaded",
    target: "Sermon_on_Grace.pdf",
    time: "5 minutes ago",
    icon: Upload,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    type: "scan",
    user: "System",
    action: "completed scan of",
    target: "Theology_Article.docx",
    time: "12 minutes ago",
    icon: CheckCircle,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    type: "flagged",
    user: "AI Analysis",
    action: "flagged high-risk content in",
    target: "Doctrine_Discussion.mp3",
    time: "1 hour ago",
    icon: AlertTriangle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    type: "audio",
    user: "Jane Smith",
    action: "recorded",
    target: "Counseling_Session_04.wav",
    time: "2 hours ago",
    icon: Mic,
    iconBg: "bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    type: "report",
    user: "Mike Brown",
    action: "generated report for",
    target: "Bible_Study_Notes.pdf",
    time: "3 hours ago",
    icon: FileText,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
  },
  {
    type: "user",
    user: "Admin",
    action: "added team member",
    target: "Sarah Johnson",
    time: "4 hours ago",
    icon: User,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-6">
            {mockActivities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  {/* Icon */}
                  <div className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-background`}>
                    <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium text-primary">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
