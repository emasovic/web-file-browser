import { FileSystemBrowser, SystemNode } from "../../fileBrowser.model";
import { File } from "../file/File";
import { Folder } from "../folder/Folder";

export const TreeView = ({
  fileBrowser,
  setselectedFile,
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
}: {
  fileBrowser: FileSystemBrowser;
  setselectedFile: (file: SystemNode) => void;
  createFile: (path: string, fileName: string, content: string) => void;
  deleteFile: (path: string) => void;
  createFolder: (path: string, folderName: string) => void;
  deleteFolder: (path: string) => void;
}) => {
  const renderTreeView = (nodes: FileSystemBrowser) => {
    return Object.entries(nodes).map(([key, node]) => {
      switch (node.type) {
        case "folder": {
          return (
            <Folder
              key={key}
              onCreateFolder={createFolder}
              onDeleteFolder={deleteFolder}
              onCreateFile={createFile}
              renderChildren={renderTreeView}
              currentPath={node.path}
              folder={node}
            />
          );
        }

        case "file": {
          return (
            <File
              key={key}
              file={node}
              currentPath={node.path}
              onClick={setselectedFile}
              onDelete={deleteFile}
            />
          );
        }

        default:
          return null;
      }
    });
  };

  return <>{renderTreeView(fileBrowser)}</>;
};
