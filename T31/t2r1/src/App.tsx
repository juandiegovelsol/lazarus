import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  file: File;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const handleFilesAdded = (newFiles: FileInfo[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDownload = async () => {
    if (files.length === 0) return;

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.file);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'uploaded-files.zip');
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
        <button onClick={handleDownload}>Download as ZIP</button>
      </div>
    </div>
  );
};

export default App;