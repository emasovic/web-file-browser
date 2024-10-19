import { ReactNode } from "react";
import { Button } from "../button/Button";

export const BasicDialog = ({
  title,
  content,
  actions,
  isOpen,
  onClose,
}: {
  title?: string;
  content?: ReactNode;
  actions?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "dialog-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="dialog-overlay"
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div className="bg-white w-1/3 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="secondary" onClick={onClose}>
            &times;
          </Button>
        </div>

        <div className="px-6 py-4">{content}</div>

        <div className="px-6 py-4 bg-gray-100 border-t flex justify-end">
          {actions}
        </div>
      </div>
    </div>
  );
};
