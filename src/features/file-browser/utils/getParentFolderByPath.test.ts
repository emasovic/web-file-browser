import { mockFileSystem } from "../mocks/fileBrowser.mock";
import { getParentFolderByPath } from "./getParentFolderByPath.util";

describe('getParentFolderByPath', () => {
    it('returns the correct parent folder when given a valid file path', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, 'src/components/header.json');
        expect(parentFolder).toEqual(mockFileSystem.src?.children?.components);
    });

    it('returns the correct parent folder when given a valid folder path', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, 'src/components');
        expect(parentFolder).toEqual(mockFileSystem.src);
    });

    it('returns correct parent folder when the path points to the root folder', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, 'src');
        expect(parentFolder).toEqual(mockFileSystem.src);
    });

    it('returns the correct parent folder for a file within the root', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, 'src/index.txt');
        expect(parentFolder).toEqual(mockFileSystem.src);
    });

    it('returns correct parent folder when the folder does not exist', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, 'src/nonExistentFolder');
        expect(parentFolder).toEqual(mockFileSystem.src);
    });

    it('returns undefined when the path is empty', () => {
        const parentFolder = getParentFolderByPath(mockFileSystem, '');
        expect(parentFolder).toBeUndefined();
    });
});