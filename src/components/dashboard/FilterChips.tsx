import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterChip {
  id: string;
  label: string;
  category: "risk" | "category" | "fileType";
  active: boolean;
}

const initialFilters: FilterChip[] = [
  { id: "high-risk", label: "High Risk", category: "risk", active: false },
  { id: "moderate-risk", label: "Moderate Risk", category: "risk", active: false },
  { id: "low-risk", label: "Low Risk", category: "risk", active: false },
  { id: "prophecy", label: "Prophecy", category: "category", active: false },
  { id: "prosperity", label: "Prosperity", category: "category", active: false },
  { id: "salvation", label: "Salvation", category: "category", active: false },
  { id: "pdf", label: "PDF", category: "fileType", active: false },
  { id: "audio", label: "Audio", category: "fileType", active: false },
  { id: "docx", label: "DOCX", category: "fileType", active: false },
];

export function FilterChips() {
  const [filters, setFilters] = useState<FilterChip[]>(initialFilters);

  const toggleFilter = (id: string) => {
    setFilters(filters.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };

  const activeFilters = filters.filter(f => f.active);
  const hasActiveFilters = activeFilters.length > 0;

  const clearAllFilters = () => {
    setFilters(filters.map(f => ({ ...f, active: false })));
  };

  const getCategoryColor = (category: FilterChip["category"], active: boolean) => {
    if (!active) return "bg-muted/50 text-muted-foreground hover:bg-muted border-transparent";
    
    const colors = {
      risk: "bg-destructive/10 text-destructive border-destructive/20",
      category: "bg-primary/10 text-primary border-primary/20",
      fileType: "bg-secondary text-secondary-foreground border-secondary",
    };
    return colors[category];
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {/* Risk Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Risk:</span>
          {filters.filter(f => f.category === "risk").map(filter => (
            <Badge
              key={filter.id}
              variant="outline"
              className={`cursor-pointer transition-all ${getCategoryColor(filter.category, filter.active)}`}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Category:</span>
          {filters.filter(f => f.category === "category").map(filter => (
            <Badge
              key={filter.id}
              variant="outline"
              className={`cursor-pointer transition-all ${getCategoryColor(filter.category, filter.active)}`}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

        {/* File Type Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Type:</span>
          {filters.filter(f => f.category === "fileType").map(filter => (
            <Badge
              key={filter.id}
              variant="outline"
              className={`cursor-pointer transition-all ${getCategoryColor(filter.category, filter.active)}`}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1.5">
            {activeFilters.map(filter => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {filter.label}
                <button
                  onClick={() => toggleFilter(filter.id)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <button
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
