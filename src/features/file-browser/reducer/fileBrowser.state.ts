import { SystemNode, FileSystemBrowser } from "../fileBrowser.model"

export type FileBrowserInitialState = {
    fileBrowser: FileSystemBrowser | null
    selectedFile: SystemNode | null
    systemFilter: string
}

export const initialState = {
    fileBrowser: null,
    selectedFile: null,
    systemFilter: ''
}