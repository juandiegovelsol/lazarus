import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  onFilesAdded: (files: FileInfo[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesAdded }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileInfos: FileInfo[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    onFilesAdded(fileInfos);
  }, [onFilesAdded]);

  console.log(useDropzone({ onDrop }))
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
};

export default FileUploader;