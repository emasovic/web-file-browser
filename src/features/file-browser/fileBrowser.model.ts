export type SystemNode = {
  type: "folder" | "file";
  name: string;
  path: string;
  children?: FileSystemBrowser;
  content?: string;
};

export type FileSystemBrowser = Record<string, SystemNode>;

export enum FileExtension {
  JSON = "json",
  TXT = "txt",
  PNG = "png"
}

export type FileExtensions = `${FileExtension}`;
