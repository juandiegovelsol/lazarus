import React, { useState } from 'react';
import FileUploader from './components/FileUploader';

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const handleFilesAdded = (newFiles: FileInfo[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  return (
    <div className="App">
      <h1>Multimedia Uploader</h1>
      <FileUploader onFilesAdded={handleFilesAdded} />
      <div>
        <h2>Uploaded Files:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
