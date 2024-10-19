import { useFileBrowserReducer } from "./hooks/useFileBrowserReducer";
import { TreeView } from "./features/tree-view/TreeView";
import { FileViewer } from "./features/file-viewer/FileViewer";
import { Breadcrumbs } from "./features/breadcrumbs/Breadcrumbs";
import { DebouncedInput } from "../../components/input/DebounceInput";

export const FileBrowser = () => {
  const {
    fileBrowser,
    selectedFile,
    filterSystem,
    setselectedFile,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    saveFile,
  } = useFileBrowserReducer();

  return (
    <div className="flex h-screen">
      <div className="w-1/5 p-4 border-r border-gray-300">
        <div>
          <DebouncedInput
            placeholder="Filter system"
            onDebounceChange={filterSystem}
          />
        </div>
        {fileBrowser ? (
          <TreeView
            fileBrowser={fileBrowser}
            setselectedFile={setselectedFile}
            createFile={createFile}
            createFolder={createFolder}
            deleteFile={deleteFile}
            deleteFolder={deleteFolder}
          />
        ) : null}
      </div>
      <div className="w-4/5 bg-white p-4">
        {selectedFile ? (
          <div className="flex flex-col gap-4">
            <Breadcrumbs selectedFile={selectedFile} />
            <FileViewer selectedFile={selectedFile} onSave={saveFile} />
          </div>
        ) : (
          <div>Select a file to view</div>
        )}
      </div>
    </div>
  );
};
