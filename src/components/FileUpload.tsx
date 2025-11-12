import { useCallback, useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files?.[0]) {
        setSelectedFile(files[0]);
      }
    },
    []
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card
        className={`p-12 border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-border bg-card"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Upload Document for Analysis
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: PDF, DOCX, TXT, EPUB
              </p>
            </div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.txt,.epub"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <File className="w-8 h-8 text-success" />
            </div>
            <div className="text-center flex items-center gap-2">
              <p className="font-medium">{selectedFile.name}</p>
              <button
                onClick={clearFile}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <Button onClick={handleAnalyze} size="lg" className="mt-4">
              Analyze Document
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
