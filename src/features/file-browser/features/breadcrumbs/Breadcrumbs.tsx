import { SystemNode } from "../../fileBrowser.model";

export const Breadcrumbs = ({ selectedFile }: { selectedFile: SystemNode }) => {
  const segments = selectedFile.path.split("/").filter((segment) => segment);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 text-gray-600">
        {segments.map((segment, index) => {
          const path = segments.slice(0, index + 1).join("/");
          const className =
            segment !== selectedFile.name
              ? "text-blue-500 text-lg"
              : "text-black text-lg";
          return (
            <li key={path} className="flex items-center">
              <span className={className}>{segment}</span>
              {index < segments.length - 1 && <span className="mx-1">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
