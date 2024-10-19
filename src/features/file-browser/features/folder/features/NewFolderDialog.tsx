import { useState } from "react";
import { BasicDialog } from "../../../../../components/basic-dialog/BasicDialog";
import { Input } from "../../../../../components/input/Input";
import { Button } from "../../../../../components/button/Button";

export const NewFolderDialog = ({
  onClose,
  onCreateFolder,
  isOpen,
}: {
  onClose: () => void;
  onCreateFolder: (folderName: string) => void;
  isOpen: boolean;
}) => {
  const [folderName, setFolderName] = useState("");
  return (
    <BasicDialog
      onClose={onClose}
      isOpen={isOpen}
      content={
        <div>
          <Input
            value={folderName}
            placeholder="Enter folder name"
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
      }
      actions={
        <div className="flex gap-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onCreateFolder(folderName)}>
            Create new folder
          </Button>
        </div>
      }
    />
  );
};
