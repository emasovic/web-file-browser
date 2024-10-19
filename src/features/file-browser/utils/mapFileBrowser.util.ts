import { FileSystemBrowser } from "../fileBrowser.model";

export const mapFileBrowser = (nodes: FileSystemBrowser, basePath: string = ''): FileSystemBrowser => {
    return Object.keys(nodes).reduce<FileSystemBrowser>((acc, key) => {
        const currentNode = nodes[key];
        const currentPath = `${basePath}${basePath ? '/' : ''}${key}`;


        const newNode = {
            ...currentNode,
            path: currentPath,
        };


        if (newNode.type === 'folder' && newNode.children) {
            newNode.children = mapFileBrowser(newNode.children, currentPath);
        }

        acc[key] = newNode;

        return acc;
    }, {} as FileSystemBrowser);
};
