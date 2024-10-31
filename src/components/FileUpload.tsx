import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onTextLoaded: (text: string) => void;
}

export function FileUpload({ onTextLoaded }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onTextLoaded(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 hover:bg-gray-50">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.doc,.docx,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col items-center"
      >
        <Upload className="w-8 h-8 mb-2 text-gray-500" />
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">TXT, DOC, DOCX, PDF</p>
      </button>
    </div>
  );
}