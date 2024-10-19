import { mapFileBrowser } from "../utils/mapFileBrowser.util";
import { getCurrentFolderByPath } from "../utils/getCurrentFolderByPath.util";
import { getParentFolderByPath } from "../utils/getParentFolderByPath.util";
import { FileBrowserActionNames, FileBrowserActions } from "./fileBrowser.actions";
import { FileBrowserInitialState } from "./fileBrowser.state";

export const fileBrowserReducer = (state: FileBrowserInitialState, action: FileBrowserActions): FileBrowserInitialState => {
  switch (action.type) {
    case FileBrowserActionNames.LOAD_FILE_BROWSER: {
      return { ...state, fileBrowser: mapFileBrowser(action.payload) }
    }

    case FileBrowserActionNames.CREATE_FOLDER: {
      const { path, folderName } = action.payload
      const fileBrowser = { ...state.fileBrowser };
      const folder = getCurrentFolderByPath(fileBrowser, path);

      if (folderName && folder?.children) {
        folder.children[folderName] = { type: "folder", name: folderName, children: {}, path: `${path}/${folderName}` };
      }
      return { ...state }
    }

    case FileBrowserActionNames.DELETE_FOLDER: {
      const fileBrowser = { ...state.fileBrowser };
      const parentFolder = getParentFolderByPath(fileBrowser, action.payload);
      const folderName = action.payload.split("/").pop();

      if (folderName) {
        if (parentFolder?.children) {
          delete parentFolder.children[folderName];
        }
        if (fileBrowser[folderName]) {
          delete fileBrowser[folderName]
        }
      }

      return {
        ...state,
        fileBrowser
      }
    }

    case FileBrowserActionNames.CREATE_FILE: {
      const { path, fileName, content } = action.payload
      const fileBrowser = { ...state.fileBrowser };
      const folder = getCurrentFolderByPath(fileBrowser, path);

      if (fileName && folder?.children) {
        folder.children[fileName] = { type: "file", content, name: fileName, path: `${path}/${fileName}` };
      }
      return { ...state, fileBrowser }
    }

    case FileBrowserActionNames.DELETE_FILE: {
      const fileBrowser = { ...state.fileBrowser };
      const folder = getCurrentFolderByPath(fileBrowser, action.payload);
      const fileName = action.payload.split("/").pop();

      if (fileName && folder?.children) {
        delete folder.children[fileName];
      }
      return {
        ...state,
        selectedFile: null,
        fileBrowser
      }
    }

    case FileBrowserActionNames.SAVE_FILE: {
      const fileBrowser = { ...state.fileBrowser };
      const parentFolder = getCurrentFolderByPath(fileBrowser, action.payload.path);

      if (
        parentFolder?.children?.[action.payload.name]
      ) {
        parentFolder.children[action.payload.name] = action.payload;

      }
      return { ...state, fileBrowser }
    }

    case FileBrowserActionNames.SET_EDITABLE_FILE: {
      return { ...state, selectedFile: action.payload }
    }

    case FileBrowserActionNames.SET_SYSTEM_FILTER: {
      return { ...state, systemFilter: action.payload }
    }

    default:
      return state;
  }
};