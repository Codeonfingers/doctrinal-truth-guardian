import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog } from "lucide-react";

export default function Admin() {
  return (
    <Layout title="Admin Panel">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              System Administration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User management and system settings will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
