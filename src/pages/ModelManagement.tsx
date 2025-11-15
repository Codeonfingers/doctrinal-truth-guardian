import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function ModelManagement() {
  return (
    <Layout title="Model Management">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Model management and deployment tools will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
