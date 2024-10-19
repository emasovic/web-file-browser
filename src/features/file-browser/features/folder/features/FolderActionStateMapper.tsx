import { FolderActionState, FolderActionStates } from "../folder.model";
import { DeleteFolderDialog } from "./DeleteFolderDialog";
import { NewFileDialog } from "./NewFileDialog";
import { NewFolderDialog } from "./NewFolderDialog";

export const FolderActionStateMapper = ({
  actionState,
  onDeleteFolder,
  onCreateFile,
  onCreateFolder,
  onClose,
}: {
  actionState: FolderActionStates;
  onDeleteFolder: () => void;
  onCreateFile: (fileName: string, content: string) => void;
  onCreateFolder: (folderName: string) => void;
  onClose: () => void;
}) => {
  switch (actionState) {
    case FolderActionState.CREATE_FOLDER: {
      return (
        <NewFolderDialog
          isOpen
          onClose={onClose}
          onCreateFolder={onCreateFolder}
        />
      );
    }
    case FolderActionState.CREATE_FILE: {
      return (
        <NewFileDialog isOpen onClose={onClose} onCreateFile={onCreateFile} />
      );
    }
    case FolderActionState.DELETE_FOLDER: {
      return (
        <DeleteFolderDialog
          isOpen
          onClose={onClose}
          onDelete={onDeleteFolder}
        />
      );
    }
    default:
      return null;
  }
};
