import { useState } from "react";
import { BasicDialog } from "../../../../../components/basic-dialog/BasicDialog";
import { Input } from "../../../../../components/input/Input";
import { Button } from "../../../../../components/button/Button";
import { RadioButton } from "../../../../../components/radio-button/RadioButton";
import { FileExtensions, FileExtension } from "../../../fileBrowser.model";

const PNG_REGEX = /\bhttps?:\/\/\S+\.png\b/i;

export const NewFileDialog = ({
  onClose,
  onCreateFile,
  isOpen,
}: {
  onClose: () => void;
  onCreateFile: (fileName: string, content: string) => void;
  isOpen: boolean;
}) => {
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFileType, setSelectedFileType] = useState<FileExtensions>(
    FileExtension.JSON
  );

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFileType(e.target.value as FileExtension);
  };

  const handleCreateFile = () => {
    const mergedFileName = `${fileName}.${selectedFileType}`;
    const content = selectedFileType === FileExtension.PNG ? imageUrl : "";

    onCreateFile(mergedFileName, content);
  };

  const isValidUrl = imageUrl ? PNG_REGEX.test(imageUrl) : true;
  const errorMessage = !isValidUrl ? "Only png images are supported" : "";
  const isDisabled = !fileName || !isValidUrl;

  return (
    <BasicDialog
      onClose={onClose}
      isOpen={isOpen}
      content={
        <div>
          <Input
            value={fileName}
            placeholder="Enter file name"
            onChange={(e) => setFileName(e.target.value)}
          />
          {selectedFileType === FileExtension.PNG ? (
            <Input
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image url"
              error={errorMessage}
              value={imageUrl}
            />
          ) : null}

          <div className="flex gap-1">
            {Object.values(FileExtension).map((fileType) => (
              <RadioButton
                key={fileType}
                label={fileType}
                name={fileType}
                value={fileType}
                checked={selectedFileType === fileType}
                onChange={handleFileTypeChange}
              />
            ))}
          </div>
        </div>
      }
      actions={
        <div className="flex gap-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateFile} disabled={isDisabled}>
            Create new file
          </Button>
        </div>
      }
    />
  );
};
