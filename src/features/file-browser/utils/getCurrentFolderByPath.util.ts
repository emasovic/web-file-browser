import { SystemNode, FileSystemBrowser } from "../fileBrowser.model";

export const getCurrentFolderByPath = (
    node: FileSystemBrowser,
    path: string
): SystemNode | undefined => {
    const parts = path.split("/").filter(Boolean);
    let currentFolder: SystemNode = node[parts[0]];

    for (const part of parts) {
        if (currentFolder && currentFolder.children?.[part]?.type === 'folder') {
            currentFolder = currentFolder.children[part];
        }
    }

    return currentFolder;
};