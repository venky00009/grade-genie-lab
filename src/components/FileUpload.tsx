import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, File, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'text/plain', 'text/markdown', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return validTypes.includes(file.type) || file.name.endsWith('.txt') || file.name.endsWith('.md');
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, TXT, MD, DOC, or DOCX files only.",
        variant: "destructive"
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: "Files uploaded successfully",
        description: `${validFiles.length} file(s) ready for processing.`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-border transition-colors duration-200 hover:border-primary/50">
        <CardContent className="p-8">
          <div
            className={`relative flex flex-col items-center justify-center space-y-4 ${
              dragActive ? 'opacity-50' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload Educational Materials
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your files here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports PDF, TXT, MD, DOC, DOCX files up to 10MB
              </p>
            </div>

            <input
              type="file"
              multiple
              accept=".pdf,.txt,.md,.doc,.docx"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Button className="mt-4">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span>Uploaded Files</span>
            </CardTitle>
            <CardDescription>
              Files ready for processing and assessment generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded flex items-center justify-center">
                      {file.type === 'application/pdf' ? (
                        <FileText className="w-4 h-4 text-secondary" />
                      ) : (
                        <File className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button className="w-full bg-gradient-secondary">
                Process Files & Generate Assessments
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};