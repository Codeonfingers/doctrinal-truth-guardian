import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Download, RefreshCw, Filter } from "lucide-react";
import { VerdictType } from "@/components/VerdictBadge";

interface Analysis {
  id: string;
  fileName: string;
  uploadedBy: string;
  date: string;
  score: number;
  verdict: VerdictType;
}

const mockAnalyses: Analysis[] = [
  {
    id: "1",
    fileName: "Sermon_on_Grace.pdf",
    uploadedBy: "John Doe",
    date: "2025-01-14",
    score: 92,
    verdict: "safe",
  },
  {
    id: "2",
    fileName: "Theology_Article.docx",
    uploadedBy: "Jane Smith",
    date: "2025-01-14",
    score: 68,
    verdict: "caution",
  },
  {
    id: "3",
    fileName: "Church_Newsletter.pdf",
    uploadedBy: "Bob Wilson",
    date: "2025-01-13",
    score: 45,
    verdict: "danger",
  },
  {
    id: "4",
    fileName: "Bible_Study_Notes.pdf",
    uploadedBy: "Sarah Jones",
    date: "2025-01-13",
    score: 88,
    verdict: "safe",
  },
  {
    id: "5",
    fileName: "Doctrine_Paper.pdf",
    uploadedBy: "Mike Brown",
    date: "2025-01-12",
    score: 75,
    verdict: "caution",
  },
];

interface RecentAnalysesTableProps {
  onViewDetails: (analysis: Analysis) => void;
}

export function RecentAnalysesTable({ onViewDetails }: RecentAnalysesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [analyses] = useState<Analysis[]>(mockAnalyses);

  const getVerdictBadge = (verdict: VerdictType, score: number) => {
    const config = {
      safe: { label: "Safe", className: "bg-success/10 text-success border-success/20" },
      caution: { label: "Caution", className: "bg-warning/10 text-warning-foreground border-warning/20" },
      danger: { label: "Danger", className: "bg-destructive/10 text-destructive border-destructive/20" },
    };
    
    const { label, className } = config[verdict];
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={className}>
          {label}
        </Badge>
        <span className={`font-semibold ${
          score >= 80 ? 'text-success' : score >= 60 ? 'text-warning-foreground' : 'text-destructive'
        }`}>
          {score}
        </span>
      </div>
    );
  };

  const filteredAnalyses = analyses.filter((a) =>
    a.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Analyses</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardTitle>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnalyses.map((analysis) => (
                <TableRow 
                  key={analysis.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onViewDetails(analysis)}
                >
                  <TableCell className="font-medium">{analysis.fileName}</TableCell>
                  <TableCell>{analysis.uploadedBy}</TableCell>
                  <TableCell>{new Date(analysis.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getVerdictBadge(analysis.verdict, analysis.score)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(analysis);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
