# Web file browser
## Instructions to run:
1. make sure to use at least node v18.20.4
2. npm install
3. npm start

## Running tests
npm run test

## Deployment
For more info visit https://create-react-app.dev/docs/deployment/

# Design and data modeling decisions
1. File Structure Representation
For the file browser, a tree-like hierarchical structure was used to represent files and folders. This design decision was made to easily manage nested files and directories, and to accommodate dynamic manipulation of the file system (e.g., creating, deleting, or editing files and folders).

   - Each node in the file system (either file or folder) is represented by the following properties:
        - Type: Denotes whether the node is a file or folder. This is crucial for distinguishing between different node types during rendering and interactions.
        - Content: Content of the file
        - Name: The name of the file or folder.
        - Path: A dynamically generated property that indicates the full path to the node. This is helpful for identifying the node’s location within the tree.
        - Children: An object (for folders) that contains the nested files or subfolders within the folder. Folders can recursively contain more children.

2. Recursive Structure for Folders
- The folder data model includes a children property that is a nested structure to allow for recursive nesting of files and subfolders. This design allows for an efficient way to represent deeply nested directories and simplifies the rendering process by using recursion.

3. Dynamic Path Generation
- Each file and folder node is dynamically assigned a path property that reflects its location within the tree. The path property was introduced to uniquely identify each node without having to rely solely on its position in the children structure. The path generation is recursive and occurs during operations like loading the file browser structure or when files/folders are created.

   - This allows easy traversal and referencing of nodes using paths, especially for actions like creating, deleting, or retrieving specific files or folders based on a given path.

4. Filter Functionality Design
- The filter functionality was designed to work recursively, traversing the file tree and matching nodes based on both file names and folder names. The filtering algorithm ensures that if a nested file matches the filter, its parent folders are also included in the result to maintain context in the tree view. This decision ensures that users always see the hierarchy and context around matching files.

5. Treeview UI Design
- The treeview structure mirrors the recursive data model of the file system. Folders are expandable, and users can toggle them to show or hide their children. Files are clickable, allowing users to view or edit their content on the right side of the UI. This separation of folders (left) and file content (right) enhances the user experience, making it easy to browse and edit files.

6. File Operations and State Management
- File operations (create, delete, edit) are handled by dispatching actions to update the state of the file browser. This ensures a clear separation of concerns, where the state of the file browser is centrally managed, and all file actions are applied uniformly. The state updates dynamically affect both the treeview and the file viewer/editor.

   - The core actions implemented include:
      - Create Folder: Adds a new folder node to the specified path.
      - Delete Folder: Removes a folder and its contents recursively.
      - Create File: Adds a new file node to a folder.
      - Delete File: Removes a file from its parent folder.
      - Edit File: Updates the content of a specific file.

7. Data Model Flexibility
- The data model is flexible enough to support additional features like file renaming, moving files, or even changing file types. The recursive nature of folders and the clear separation of files and folders in the model ensures that future scalability and feature additions (such as support for additional file types) can be implemented with minimal changes to the core model.

8. Testing Strategy
- The testing approach includes unit tests for each action (filtering, creating, deleting, and editing files/folders). The recursive nature of the file system is considered in tests to ensure that nested structures are handled correctly. Edge cases like invalid paths, missing files, or empty folders are tested to ensure robustness.

9. Tailwind for Styling
- Tailwind CSS is used for layout and styling to maintain consistency and efficiency in design. It allows for rapid prototyping and easy maintenance of styles, especially when building components like the treeview, modals, and buttons.

## Additional features
- Load/save data from local storage
- Confirmation dialogs for create/delete
- Recursive search on folders and files
- Save/cancel file
- Debounced filter
