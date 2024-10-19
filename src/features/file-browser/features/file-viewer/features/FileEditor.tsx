import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { FileExtension, SystemNode } from "../../../fileBrowser.model";
import { Button } from "../../../../../components/button/Button";

const HIGHLIGHER = {
  [FileExtension.JSON]: {
    grammar: "json",
    language: "json",
  },
  [FileExtension.TXT]: {
    grammar: "markup",
    language: "markup",
  },
  [FileExtension.PNG]: {
    grammar: "txt",
    language: "txt",
  },
};

export const FileEditor = ({
  selectedFile,
  onSave,
}: {
  selectedFile: SystemNode;
  onSave: (editedFile: SystemNode) => void;
}) => {
  const [value, setValue] = useState(selectedFile.content as string);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const fileExtension = selectedFile.name
    .split(".")
    .filter(Boolean)
    .pop() as FileExtension;

  const fileHightLighter = HIGHLIGHER[fileExtension];

  const toggleEditMode = () => setIsInEditMode(!isInEditMode);

  const handleCancel = () => {
    setValue(selectedFile.content as string);
    toggleEditMode();
  };

  const handleSave = () => {
    onSave({ ...selectedFile, content: value });
    toggleEditMode();
  };

  useEffect(() => {
    setValue(selectedFile.content as string);
  }, [selectedFile.content]);

  return (
    <div className="w-full h-calc-minus-100 border rounded">
      <div className="flex gap-1 border-b p-2 bg-gray-100">
        {isInEditMode ? (
          <>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <Button onClick={toggleEditMode} variant="secondary">
            Edit
          </Button>
        )}
      </div>

      <div className="overflow-y-auto">
        <Editor
          placeholder="Type some code…"
          disabled={!isInEditMode}
          value={value}
          onValueChange={(code) => setValue(code)}
          highlight={(code) =>
            highlight(
              code,
              languages[fileHightLighter.grammar],
              fileHightLighter.language
            )
          }
          padding={10}
        />
      </div>
    </div>
  );
};
