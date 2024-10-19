import { SystemNode, FileSystemBrowser } from "../fileBrowser.model";

export const getParentFolderByPath = (
    node: FileSystemBrowser,
    path: string
): SystemNode | null => {
    const parts = path.split("/").filter(Boolean);
    let currentFolder: SystemNode = node[parts[0]];

    for (let i = 0; i < parts.length - 1; i++) {
        if (currentFolder && currentFolder.children?.[parts[i]]?.type === 'folder') {
            currentFolder = currentFolder.children[parts[i]];
        }
    }

    return currentFolder;
};