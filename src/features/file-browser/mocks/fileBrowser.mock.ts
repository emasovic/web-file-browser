import { FileSystemBrowser } from "../fileBrowser.model";

export const mockFileSystem: FileSystemBrowser = {
    src: {
        type: "folder",
        name: "src",
        path: '',
        children: {
            "app.json": {
                type: "file",
                name: "app.json",
                path: '',
                content: "{}"
            },
            "index.txt": {
                path: '',
                type: "file",
                name: "index.txt",
                content: "Hello World!"
            },
            "components": {
                type: "folder",
                name: "components",
                path: '',
                children: {
                    "header.json": {
                        path: '',
                        type: "file",
                        name: "header.json",
                        content: "{ header: 'Hello' }"
                    },
                    "new-folder": {
                        path: '',
                        type: "folder",
                        name: "new-folder",
                        children: {}
                    }
                }
            }
        }
    },
    public: {
        path: '',
        type: "folder",
        name: "public",
        children: {}
    }
};