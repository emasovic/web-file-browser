import { BasicDialog } from "../../../../../components/basic-dialog/BasicDialog";
import { Button } from "../../../../../components/button/Button";

export const DeleteFolderDialog = ({
  onClose,
  onDelete,
  isOpen,
}: {
  onClose: () => void;
  onDelete: () => void;
  isOpen: boolean;
}) => {
  return (
    <BasicDialog
      onClose={onClose}
      isOpen={isOpen}
      content={
        <div>
          <p>Are you sure you want to delete this folder?</p>
        </div>
      }
      actions={
        <div className="flex gap-1">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      }
    />
  );
};
