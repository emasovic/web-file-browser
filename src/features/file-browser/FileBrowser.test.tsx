import { render, screen } from "@testing-library/react";
import { FileBrowser } from "./FileBrowser";
import { mockFileSystem } from "./mocks/fileBrowser.mock";
import { updateLocalStorage } from "./utils/updateLocalStorage.util";
import "../../index.css";
import userEvent from "@testing-library/user-event";
import { FileExtension } from "./fileBrowser.model";

describe("File browser test", () => {
  beforeEach(() => {
    updateLocalStorage(mockFileSystem);
  });
  it("renders tree view", () => {
    render(<FileBrowser />);

    expect(screen.getByText("public")).toBeVisible();
    expect(screen.getByText("src")).toBeVisible();
  });
  it("creates folder", async () => {
    const user = userEvent.setup();
    render(<FileBrowser />);

    await user.click(screen.getAllByText("New Folder")[0]);
    await user.type(
      screen.getByPlaceholderText("Enter folder name"),
      "test-folder"
    );
    await user.click(screen.getByRole("button", { name: "Create new folder" }));
    await user.click(screen.getByText("src"));

    expect(screen.getByText("test-folder")).toBeVisible();
  });

  it("deletes folder", async () => {
    const user = userEvent.setup();
    render(<FileBrowser />);

    await user.click(screen.getAllByText("Delete")[0]);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("src")).not.toBeInTheDocument();
  });
  it.each([FileExtension.JSON, FileExtension.TXT])(
    "creates file with type %s",
    async (fileType) => {
      const user = userEvent.setup();
      render(<FileBrowser />);

      await user.click(screen.getAllByText("New File")[0]);
      await user.type(
        screen.getByPlaceholderText("Enter file name"),
        "test-file"
      );
      await user.click(screen.getByDisplayValue(fileType));
      await user.click(screen.getByRole("button", { name: "Create new file" }));
      await user.click(screen.getByText("src"));

      expect(screen.getByText(`test-file.${fileType}`)).toBeVisible();
    }
  );
  it("creates file with type png", async () => {
    const user = userEvent.setup();
    render(<FileBrowser />);

    await user.click(screen.getAllByText("New File")[0]);
    await user.click(screen.getByDisplayValue("png"));
    await user.type(
      screen.getByPlaceholderText("Enter file name"),
      "test-file"
    );
    await user.type(
      screen.getByPlaceholderText("Paste image url"),
      "https://path-to-image.png"
    );
    await user.click(screen.getByRole("button", { name: "Create new file" }));
    await user.click(screen.getByText("src"));

    expect(screen.getByText(`test-file.png`)).toBeVisible();
  });

  it("deletes file", async () => {
    const user = userEvent.setup();
    render(<FileBrowser />);

    await user.click(screen.getByText("src"));
    await user.click(screen.getAllByText("Delete file")[0]);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText(`app.json`)).not.toBeInTheDocument();
  });

  it("selects file", async () => {
    const user = userEvent.setup();
    render(<FileBrowser />);

    await user.click(screen.getByText("src"));
    await user.click(screen.getByText("index.txt"));

    expect(screen.getAllByText(`Hello World!`)).toHaveLength(2);
  });
});
