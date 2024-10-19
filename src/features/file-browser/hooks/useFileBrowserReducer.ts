import { useCallback, useEffect, useMemo, useReducer } from "react"
import { fileBrowserReducer } from "../reducer/fileBrowser.reducer"
import { initialState } from "../reducer/fileBrowser.state"
import { FileBrowserActionNames } from "../reducer/fileBrowser.actions"
import { FileSystemBrowser, SystemNode } from "../fileBrowser.model"
import { updateLocalStorage } from "../utils/updateLocalStorage.util"
import { filterFileBrowser } from "../utils/filterFileBrowser.util"

export const useFileBrowserReducer = () => {
    const [state, dispatch] = useReducer(fileBrowserReducer, initialState)

    const setFileBrowser = useCallback((payload: FileSystemBrowser) => dispatch({ type: FileBrowserActionNames.LOAD_FILE_BROWSER, payload }), [])

    const createFolder = useCallback((path: string, folderName: string) => dispatch({ type: FileBrowserActionNames.CREATE_FOLDER, payload: { folderName, path } }), [])

    const deleteFolder = useCallback((path: string) => dispatch({ type: FileBrowserActionNames.DELETE_FOLDER, payload: path }), [])

    const createFile = useCallback((path: string, fileName: string, content: string) => dispatch({ type: FileBrowserActionNames.CREATE_FILE, payload: { fileName, path, content } }), [])

    const deleteFile = useCallback((path: string) => dispatch({ type: FileBrowserActionNames.DELETE_FILE, payload: path }), [])

    const setselectedFile = useCallback((selectedFile: SystemNode | null) => dispatch({ type: FileBrowserActionNames.SET_EDITABLE_FILE, payload: selectedFile }), [])

    const filterSystem = useCallback((filter: string) => dispatch({ type: FileBrowserActionNames.SET_SYSTEM_FILTER, payload: filter }), [])

    const saveFile = useCallback((editedFile: SystemNode) => dispatch({ type: FileBrowserActionNames.SAVE_FILE, payload: editedFile }), [])

    const filteredFileBrowser = useMemo(() => state.fileBrowser ? filterFileBrowser(state.fileBrowser, state.systemFilter) : state.fileBrowser, [state.fileBrowser, state.systemFilter])

    useEffect(() => {
        const storedfileBrowser = localStorage.getItem("fileBrowser");
        if (storedfileBrowser) {
            setFileBrowser(JSON.parse(storedfileBrowser));
        } else {
            fetch("/fileBrowser.json")
                .then((response) => response.json())
                .then((data) => {
                    setFileBrowser(data);
                })
                .catch((error) => console.error("Error loading file system:", error));
        }
    }, [setFileBrowser]);

    useEffect(() => {
        if (state.fileBrowser) {
            updateLocalStorage(state.fileBrowser)
        }

    }, [state.fileBrowser])

    return useMemo(() => ({
        ...state,
        fileBrowser: filteredFileBrowser,
        setselectedFile,
        createFolder,
        deleteFolder,
        createFile,
        deleteFile,
        saveFile,
        filterSystem,
    }), [state, filteredFileBrowser, setselectedFile, createFolder, deleteFolder, createFile, deleteFile, saveFile, filterSystem])
}