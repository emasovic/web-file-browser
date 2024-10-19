import { FileSystemBrowser } from "../fileBrowser.model";

export const updateLocalStorage = (fileBrowser: FileSystemBrowser) => {
    localStorage.setItem("fileBrowser", JSON.stringify(fileBrowser));
}; 