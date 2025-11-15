import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function DatasetScreening() {
  return (
    <Layout title="Dataset Screening">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dataset Integrity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dataset screening tools will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
