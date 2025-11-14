import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Settings, UserPlus } from "lucide-react";

const mockActivities = [
  {
    type: "upload",
    user: "John Doe",
    action: "uploaded",
    target: "Sermon_on_Grace.pdf",
    time: "5 minutes ago",
    icon: Upload,
  },
  {
    type: "review",
    user: "Jane Smith",
    action: "reviewed",
    target: "Theology_Article.docx",
    time: "1 hour ago",
    icon: FileText,
  },
  {
    type: "model",
    user: "System",
    action: "updated model to",
    target: "v2.5.1",
    time: "2 hours ago",
    icon: Settings,
  },
  {
    type: "user",
    user: "Admin",
    action: "added user",
    target: "Mike Brown",
    time: "3 hours ago",
    icon: UserPlus,
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
