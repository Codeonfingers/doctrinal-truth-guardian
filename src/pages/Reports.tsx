import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Analysis Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Historical analysis reports will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
