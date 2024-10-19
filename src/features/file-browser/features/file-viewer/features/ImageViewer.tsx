import { SystemNode } from "../../../fileBrowser.model";

export const ImageViewer = ({ selectedFile }: { selectedFile: SystemNode }) => (
  <div className="flex items-center justify-center border p-2 rounded h-calc-minus-100">
    <img
      src={selectedFile.content}
      alt={selectedFile.name}
      className="max-w-full max-h-full object-contain"
    />
  </div>
);
