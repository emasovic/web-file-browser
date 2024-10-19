import { ReactNode, useCallback, useState } from "react";
import { SystemNode, FileSystemBrowser } from "../../fileBrowser.model";
import { FolderActionState, FolderActionStates } from "./folder.model";
import { FolderActionStateMapper } from "./features/FolderActionStateMapper";

export const Folder = ({
  onCreateFolder,
  onDeleteFolder,
  onCreateFile,
  renderChildren,
  currentPath,
  folder,
}: {
  folder: SystemNode;
  currentPath: string;
  renderChildren: (
    children: FileSystemBrowser,
    currentPath: string
  ) => ReactNode;
  onCreateFolder: (path: string, folderName: string) => void;
  onDeleteFolder: (path: string) => void;
  onCreateFile: (path: string, fileName: string, content: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, setActionState] = useState<FolderActionStates | null>(
    null
  );

  const handleCreateFolder = useCallback(
    (folderName: string) => {
      onCreateFolder(currentPath, folderName);
      setActionState(null);
    },
    [currentPath, onCreateFolder]
  );

  const handleDeleteFolder = useCallback(() => {
    onDeleteFolder(currentPath);
    setActionState(null);
  }, [currentPath, onDeleteFolder]);

  const handleCreateFile = useCallback(
    (fileName: string, content: string) => {
      onCreateFile(currentPath, fileName, content);
      setActionState(null);
    },
    [currentPath, onCreateFile]
  );

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="relative group">
        <div
          className="cursor-pointer hover:text-blue-500"
          onClick={toggleOpen}
        >
          {isOpen ? "📂" : "📁"} <span>{folder.name}</span>
        </div>
        <div className="absolute left-24 top-0 hidden group-hover:block bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setActionState(FolderActionState.CREATE_FILE)}
            >
              New File
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setActionState(FolderActionState.CREATE_FOLDER)}
            >
              New Folder
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={() => {
                setActionState(FolderActionState.DELETE_FOLDER);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
      {isOpen ? (
        <div className="pl-4">
          {folder.children
            ? renderChildren(folder.children, currentPath)
            : null}
        </div>
      ) : null}
      {actionState ? (
        <FolderActionStateMapper
          actionState={actionState}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          onCreateFile={handleCreateFile}
          onClose={() => setActionState(null)}
        />
      ) : null}
    </div>
  );
};
