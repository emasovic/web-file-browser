export enum FolderActionState {
    CREATE_FOLDER = 'create-folder',
    CREATE_FILE = 'create-file',
    DELETE_FOLDER = 'delete-folder'
}

export type FolderActionStates = `${FolderActionState}`