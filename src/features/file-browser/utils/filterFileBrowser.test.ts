import { mockFileSystem } from '../mocks/fileBrowser.mock';
import { filterFileBrowser } from './filterFileBrowser.util';

describe('filterFileBrowser', () => {

    it('returns all nodes if filter is empty', () => {
        const result = filterFileBrowser(mockFileSystem, '');
        expect(result).toEqual(mockFileSystem);
    });

    it('filters files by name and return matching nodes', () => {
        const result = filterFileBrowser(mockFileSystem, 'app');
        expect(result).toEqual({
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
                    }
                }
            }
        });
    });

    it('filters folders and their children recursively', () => {
        const result = filterFileBrowser(mockFileSystem, 'components');
        expect(result).toEqual({
            src: {
                type: "folder",
                name: "src",
                path: '',
                children: {
                    components: {
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
            }
        });
    });

    it('returns parent folders if they contain matching files', () => {
        const result = filterFileBrowser(mockFileSystem, 'header');
        expect(result).toEqual({
            src: {
                type: "folder",
                name: "src",
                path: '',
                children: {
                    components: {
                        type: "folder",
                        name: "components",
                        path: '',
                        children: {
                            "header.json": {
                                path: '',
                                type: "file",
                                name: "header.json",
                                content: "{ header: 'Hello' }"
                            }
                        }
                    }
                }
            }
        });
    });

    it('returns an empty object if no matching nodes are found', () => {
        const result = filterFileBrowser(mockFileSystem, 'nonexistent');
        expect(result).toEqual({});
    });

    it('returns the whole folder if query matches folder name', () => {
        const result = filterFileBrowser(mockFileSystem, 'public');
        expect(result).toEqual({
            public: {
                path: '',
                type: "folder",
                name: "public",
                children: {}
            },
        });
    });
});
