import { FileExtension, SystemNode } from "../../fileBrowser.model";
import { ImageViewer } from "./features/ImageViewer";
import { FileEditor } from "./features/FileEditor";

export const FileViewer = ({
  selectedFile,
  onSave,
}: {
  selectedFile: SystemNode;
  onSave: (editedFile: SystemNode) => void;
}) => {
  const fileExtension = selectedFile.name
    .split(".")
    .filter(Boolean)
    .pop() as FileExtension;

  return (
    <div className="w-full h-full">
      {fileExtension === FileExtension.PNG ? (
        <ImageViewer selectedFile={selectedFile} />
      ) : (
        <FileEditor onSave={onSave} selectedFile={selectedFile} />
      )}
    </div>
  );
};
