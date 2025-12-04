import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Download, MoreHorizontal, FileText, FileAudio, FileType, Clock, CheckCircle, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FilterChip } from "./FilterChips";

export interface QueueItem {
  id: string;
  fileName: string;
  fileType: "pdf" | "docx" | "audio" | "text";
  riskLevel: "low" | "moderate" | "high";
  status: "pending" | "processing" | "completed" | "flagged";
  date: string;
  score?: number;
  uploadedBy?: string;
}

const mockQueueItems: QueueItem[] = [
  {
    id: "1",
    fileName: "Sermon_on_Grace.pdf",
    fileType: "pdf",
    riskLevel: "low",
    status: "completed",
    date: "2025-01-14",
    score: 92,
    uploadedBy: "Pastor John",
  },
  {
    id: "2",
    fileName: "Theology_Discussion.mp3",
    fileType: "audio",
    riskLevel: "high",
    status: "flagged",
    date: "2025-01-14",
    score: 45,
    uploadedBy: "Elder Mike",
  },
  {
    id: "3",
    fileName: "Church_Newsletter.docx",
    fileType: "docx",
    riskLevel: "moderate",
    status: "processing",
    date: "2025-01-13",
    score: 68,
    uploadedBy: "Admin Sarah",
  },
  {
    id: "4",
    fileName: "Bible_Study_Notes.txt",
    fileType: "text",
    riskLevel: "low",
    status: "pending",
    date: "2025-01-13",
    score: 88,
    uploadedBy: "Deacon Paul",
  },
  {
    id: "5",
    fileName: "Doctrine_Paper.pdf",
    fileType: "pdf",
    riskLevel: "moderate",
    status: "completed",
    date: "2025-01-12",
    score: 72,
    uploadedBy: "Pastor John",
  },
];

interface ScreeningQueueTableProps {
  onViewDetails?: (item: QueueItem) => void;
  filters?: FilterChip[];
}

export function ScreeningQueueTable({ onViewDetails, filters = [] }: ScreeningQueueTableProps) {
  const filteredItems = useMemo(() => {
    const activeRiskFilters = filters.filter(f => f.category === "risk" && f.active);
    const activeFileTypeFilters = filters.filter(f => f.category === "fileType" && f.active);
    
    return mockQueueItems.filter(item => {
      // Risk filter
      if (activeRiskFilters.length > 0) {
        const riskMatch = activeRiskFilters.some(f => {
          if (f.id === "high-risk") return item.riskLevel === "high";
          if (f.id === "moderate-risk") return item.riskLevel === "moderate";
          if (f.id === "low-risk") return item.riskLevel === "low";
          return false;
        });
        if (!riskMatch) return false;
      }
      
      // File type filter
      if (activeFileTypeFilters.length > 0) {
        const typeMatch = activeFileTypeFilters.some(f => {
          if (f.id === "pdf") return item.fileType === "pdf";
          if (f.id === "audio") return item.fileType === "audio";
          if (f.id === "docx") return item.fileType === "docx";
          return false;
        });
        if (!typeMatch) return false;
      }
      
      return true;
    });
  }, [filters]);

  const getFileTypeIcon = (type: QueueItem["fileType"]) => {
    const icons = {
      pdf: <FileText className="h-4 w-4 text-destructive" />,
      docx: <FileType className="h-4 w-4 text-primary" />,
      audio: <FileAudio className="h-4 w-4 text-warning-foreground" />,
      text: <FileText className="h-4 w-4 text-muted-foreground" />,
    };
    return icons[type];
  };

  const getFileTypeBadge = (type: QueueItem["fileType"]) => {
    const config = {
      pdf: { label: "PDF", className: "bg-destructive/10 text-destructive border-destructive/20" },
      docx: { label: "DOCX", className: "bg-primary/10 text-primary border-primary/20" },
      audio: { label: "Audio", className: "bg-warning/10 text-warning-foreground border-warning/20" },
      text: { label: "Text", className: "bg-muted text-muted-foreground border-border" },
    };
    const { label, className } = config[type];
    return (
      <Badge variant="outline" className={`${className} gap-1.5`}>
        {getFileTypeIcon(type)}
        {label}
      </Badge>
    );
  };

  const getRiskBadge = (level: QueueItem["riskLevel"]) => {
    const config = {
      low: { label: "Low Risk", className: "bg-success/10 text-success border-success/20" },
      moderate: { label: "Moderate", className: "bg-warning/10 text-warning-foreground border-warning/20" },
      high: { label: "High Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
    };
    const { label, className } = config[level];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: QueueItem["status"]) => {
    const config = {
      pending: { label: "Pending", icon: Clock, className: "bg-muted text-muted-foreground" },
      processing: { label: "Processing", icon: Clock, className: "bg-primary/10 text-primary" },
      completed: { label: "Completed", icon: CheckCircle, className: "bg-success/10 text-success" },
      flagged: { label: "Flagged", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
    };
    const { label, icon: Icon, className } = config[status];
    return (
      <Badge variant="secondary" className={`${className} gap-1.5`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Screening Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Filename</TableHead>
                <TableHead className="font-semibold">File Type</TableHead>
                <TableHead className="font-semibold">Risk Level</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No items match the selected filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => onViewDetails?.(item)}
                  >
                    <TableCell className="font-medium">{item.fileName}</TableCell>
                    <TableCell>{getFileTypeBadge(item.fileType)}</TableCell>
                    <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails?.(item);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Re-scan</DropdownMenuItem>
                            <DropdownMenuItem>Mark as reviewed</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
