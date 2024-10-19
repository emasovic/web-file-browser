import { FileSystemBrowser, SystemNode } from "../fileBrowser.model";

export enum FileBrowserActionNames {
    LOAD_FILE_BROWSER,
    CREATE_FOLDER,
    DELETE_FOLDER,
    CREATE_FILE,
    SAVE_FILE,
    DELETE_FILE,
    SET_EDITABLE_FILE,
    SET_SYSTEM_FILTER
}

export type FileBrowserActions = | { type: FileBrowserActionNames.LOAD_FILE_BROWSER; payload: FileSystemBrowser }
    | { type: FileBrowserActionNames.CREATE_FOLDER; payload: { path: string, folderName: string } }
    | { type: FileBrowserActionNames.DELETE_FOLDER; payload: string }
    | { type: FileBrowserActionNames.CREATE_FILE; payload: { path: string, fileName: string; content: string } }
    | { type: FileBrowserActionNames.DELETE_FILE; payload: string }
    | { type: FileBrowserActionNames.SAVE_FILE; payload: SystemNode }
    | { type: FileBrowserActionNames.SET_EDITABLE_FILE; payload: SystemNode | null }
    | { type: FileBrowserActionNames.SET_SYSTEM_FILTER; payload: string }