import { useState } from "react";
import { BasicDialog } from "../../../../components/basic-dialog/BasicDialog";
import { Button } from "../../../../components/button/Button";
import { SystemNode } from "../../fileBrowser.model";

export const File = ({
  onClick,
  onDelete,
  currentPath,
  file,
}: {
  file: SystemNode;
  currentPath: string;
  onClick: (selectedFile: SystemNode) => void;
  onDelete: (path: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="relative group">
      <div
        className="name cursor-pointer hover:text-blue-500"
        onClick={() => onClick(file)}
      >
        📄 <span>{file.name}</span>
      </div>
      <div className="absolute left-24 top-0 hidden group-hover:block bg-white border border-gray-300 rounded-md shadow-lg z-10">
        <ul>
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
            onClick={toggleOpen}
          >
            Delete file
          </li>
        </ul>
      </div>
      {isOpen ? (
        <BasicDialog
          onClose={toggleOpen}
          isOpen={isOpen}
          content={
            <div>
              <p>Are you sure you want to delete this file?</p>
            </div>
          }
          actions={
            <div className="flex gap-1">
              <Button variant="secondary" onClick={toggleOpen}>
                Cancel
              </Button>
              <Button onClick={() => onDelete(currentPath)}>Delete</Button>
            </div>
          }
        />
      ) : null}
    </div>
  );
};
