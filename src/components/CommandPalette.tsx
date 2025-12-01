import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Shield,
  Home,
  BarChart3,
  FileText,
  Settings,
  Users,
  Upload,
  Mic,
  Search,
  Sun,
  Moon,
  Database,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analyzer"))}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Analyzer</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/reports"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/dataset-screening"))}>
            <Database className="mr-2 h-4 w-4" />
            <span>Dataset Screening</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/model-management"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Model Management</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/admin"))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Admin</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => navigate("/analyzer"))}>
            <Upload className="mr-2 h-4 w-4" />
            <span>Upload Document</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analyzer"))}>
            <Mic className="mr-2 h-4 w-4" />
            <span>Record Audio</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analyzer"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Start New Analysis</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Toggle Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
