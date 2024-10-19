import { FileSystemBrowser, SystemNode } from "../fileBrowser.model";

export const filterFileBrowser = (nodes: FileSystemBrowser, filter: string) => {
    const filteredNodes: Record<string, SystemNode> = {};

    Object.values(nodes).forEach((node) => {
        if (node.name.toLowerCase().includes(filter.toLowerCase())) {
            filteredNodes[node.name] = node;
        } else if (node.type === 'folder' && node.children) {
            const filteredChildren = filterFileBrowser(node.children, filter);
            if (Object.keys(filteredChildren).length > 0) {
                filteredNodes[node.name] = {
                    ...node,
                    children: filteredChildren,
                };
            }
        }
    });

    return filteredNodes;
};