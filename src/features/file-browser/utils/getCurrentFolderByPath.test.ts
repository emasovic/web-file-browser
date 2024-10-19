import { mockFileSystem } from "../mocks/fileBrowser.mock";
import { getCurrentFolderByPath } from "./getCurrentFolderByPath.util";



describe('getCurrentFolderByPath', () => {
    it('returns the correct folder when given a valid path', () => {
        const folder = getCurrentFolderByPath(mockFileSystem, 'src/components');
        expect(folder).toEqual(mockFileSystem.src?.children?.components);
    });

    it('returns `src folder` when the path leads to a file', () => {
        const folder = getCurrentFolderByPath(mockFileSystem, 'src/app.json');
        expect(folder).toEqual(mockFileSystem.src);
    });

    it('returns `src components` when the path leads to a nested file', () => {
        const folder = getCurrentFolderByPath(mockFileSystem, 'src/components/header.json');
        expect(folder).toEqual(mockFileSystem.src?.children?.components);
    });

    it('returns undefined when the folder does not exist', () => {
        const folder = getCurrentFolderByPath(mockFileSystem, 'abc/nonExistentFolder');
        expect(folder).toBeUndefined();
    });

    it('returns the root folder if the path is valid at the top level', () => {
        const folder = getCurrentFolderByPath(mockFileSystem, 'public');
        expect(folder).toEqual(mockFileSystem.public);
    });
});