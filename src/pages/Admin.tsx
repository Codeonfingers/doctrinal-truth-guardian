import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Shield, Key, Activity, Mail, MoreHorizontal, Plus, Search, Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";

const mockUsers = [
  { id: 1, name: "Pastor James", email: "james@church.org", role: "admin", status: "active" },
  { id: 2, name: "Sarah Miller", email: "sarah@church.org", role: "editor", status: "active" },
  { id: 3, name: "David Chen", email: "david@church.org", role: "viewer", status: "pending" },
  { id: 4, name: "Mary Johnson", email: "mary@church.org", role: "editor", status: "active" },
];

const mockInbox = [
  { id: 1, title: "High-risk sermon flagged", type: "alert", time: "2 hours ago", read: false },
  { id: 2, title: "New member joined workspace", type: "info", time: "5 hours ago", read: false },
  { id: 3, title: "Review request from Sarah", type: "request", time: "1 day ago", read: true },
];

const mockAuditLogs = [
  { id: 1, action: "User invited", user: "Pastor James", target: "david@church.org", time: "2 hours ago" },
  { id: 2, action: "Role changed", user: "Pastor James", target: "Sarah Miller → Editor", time: "1 day ago" },
  { id: 3, action: "Report exported", user: "Sarah Miller", target: "Weekly Analysis", time: "2 days ago" },
];

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState("");

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin": return "bg-primary/10 text-primary border-primary/20";
      case "editor": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusBadge = (status: string) => status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20";

  const getInboxIcon = (type: string) => {
    if (type === "alert") return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (type === "request") return <Clock className="h-4 w-4 text-amber-500" />;
    return <Bell className="h-4 w-4 text-primary" />;
  };

  return (
    <Layout title="Admin Panel">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 space-y-6">
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Administration</h1>
              <p className="text-muted-foreground">Manage users, permissions, and workspace settings</p>
            </div>
            <Button><Plus className="h-4 w-4 mr-2" />Invite Member</Button>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem><Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Users className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Team Members</p><p className="text-2xl font-bold">12</p></div></div></CardContent></Card></StaggerItem>
          <StaggerItem><Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center"><CheckCircle className="h-6 w-6 text-green-500" /></div><div><p className="text-sm text-muted-foreground">Active Users</p><p className="text-2xl font-bold">10</p></div></div></CardContent></Card></StaggerItem>
          <StaggerItem><Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center"><Clock className="h-6 w-6 text-amber-500" /></div><div><p className="text-sm text-muted-foreground">Pending Invites</p><p className="text-2xl font-bold">2</p></div></div></CardContent></Card></StaggerItem>
          <StaggerItem><Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center"><AlertTriangle className="h-6 w-6 text-destructive" /></div><div><p className="text-sm text-muted-foreground">Pending Reviews</p><p className="text-2xl font-bold">5</p></div></div></CardContent></Card></StaggerItem>
        </StaggerContainer>

        <FadeInUp>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" />Users</TabsTrigger>
              <TabsTrigger value="inbox" className="gap-2"><Mail className="h-4 w-4" />Team Inbox<Badge variant="secondary" className="ml-1">2</Badge></TabsTrigger>
              <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" />Security</TabsTrigger>
              <TabsTrigger value="audit" className="gap-2"><Activity className="h-4 w-4" />Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div><CardTitle>Team Members</CardTitle><CardDescription>Manage access and permissions</CardDescription></div>
                    <div className="relative w-full md:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.map((user, index) => (
                      <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar><AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                          <div><p className="font-medium">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getRoleBadge(user.role)}>{user.role}</Badge>
                          <Badge className={getStatusBadge(user.status)}>{user.status}</Badge>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inbox">
              <Card>
                <CardHeader><CardTitle>Team Inbox</CardTitle><CardDescription>Notifications and review requests</CardDescription></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockInbox.map((item, index) => (
                      <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className={`flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer ${!item.read ? 'bg-primary/5' : ''}`}>
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">{getInboxIcon(item.type)}</div>
                        <div className="flex-1"><p className={`font-medium ${!item.read ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</p><p className="text-sm text-muted-foreground">{item.time}</p></div>
                        {!item.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Key className="h-5 w-5" />API Keys</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border"><div><p className="font-medium">Production Key</p><p className="text-sm text-muted-foreground">ds_prod_****...****8f2a</p></div><Button variant="outline" size="sm">Regenerate</Button></div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border"><div><p className="font-medium">Development Key</p><p className="text-sm text-muted-foreground">ds_dev_****...****3b1c</p></div><Button variant="outline" size="sm">Regenerate</Button></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Security Settings</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between"><div><Label>Two-Factor Authentication</Label><p className="text-sm text-muted-foreground">Require 2FA for all users</p></div><Switch /></div>
                    <div className="flex items-center justify-between"><div><Label>Session Timeout</Label><p className="text-sm text-muted-foreground">Auto-logout after inactivity</p></div><Switch defaultChecked /></div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audit">
              <Card>
                <CardHeader><CardTitle>Audit Log</CardTitle><CardDescription>Track all system activities</CardDescription></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAuditLogs.map((log, index) => (
                      <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"><Activity className="h-4 w-4 text-muted-foreground" /></div>
                        <div className="flex-1"><p className="font-medium">{log.action}</p><p className="text-sm text-muted-foreground">by {log.user} • {log.target}</p></div>
                        <span className="text-sm text-muted-foreground">{log.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeInUp>
      </div>
    </Layout>
  );
}
