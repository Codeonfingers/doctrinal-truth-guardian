import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchFilter {
  id: string;
  label: string;
  checked: boolean;
}

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilter[]>([
    { id: "high-risk", label: "High Risk", checked: false },
    { id: "moderate-risk", label: "Moderate Risk", checked: false },
    { id: "safe", label: "Safe", checked: false },
    { id: "pdf", label: "PDF", checked: false },
    { id: "audio", label: "Audio", checked: false },
    { id: "text", label: "Text", checked: false },
  ]);

  const activeFilters = filters.filter((f) => f.checked);

  const toggleFilter = (id: string) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const clearFilters = () => {
    setFilters(filters.map((f) => ({ ...f, checked: false })));
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents, scriptures, doctrinal terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {activeFilters.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                {activeFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="mb-2 text-sm font-medium">Risk Level</h5>
                  <div className="space-y-2">
                    {filters.slice(0, 3).map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={filter.id}
                          checked={filter.checked}
                          onCheckedChange={() => toggleFilter(filter.id)}
                        />
                        <Label
                          htmlFor={filter.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {filter.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="mb-2 text-sm font-medium">Source Type</h5>
                  <div className="space-y-2">
                    {filters.slice(3).map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={filter.id}
                          checked={filter.checked}
                          onCheckedChange={() => toggleFilter(filter.id)}
                        />
                        <Label
                          htmlFor={filter.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {filter.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="gap-1">
              {filter.label}
              <button
                onClick={() => toggleFilter(filter.id)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
