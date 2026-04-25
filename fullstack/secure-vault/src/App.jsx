import { useEffect, useState } from "react";
import vaultData from "../data.json";

function App() {
  const [vaultItems, setVaultItems] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFileId, setSelectedFileId] = useState(null);

  useEffect(() => {
    setVaultItems(vaultData);
    setExpandedFolders(buildInitialExpandedState(vaultData));
  }, []);

  const buildInitialExpandedState = (items) => {
    return items.reduce((acc, item) => {
      if (item.type === "folder") {
        acc[item.id] = true;
      }

      if (item.children?.length) {
        Object.assign(acc, buildInitialExpandedState(item.children));
      }

      return acc;
    }, {});
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((current) => ({
      ...current,
      [folderId]: !current[folderId]
    }));
  };

  const findNodeById = (items, id) => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }

      if (item.children?.length) {
        const match = findNodeById(item.children, id);
        if (match) {
          return match;
        }
      }
    }

    return null;
  };

  const selectedFile = selectedFileId ? findNodeById(vaultItems, selectedFileId) : null;

  const renderTree = (items, depth = 0) => {
    return (
      <ul className="m-0 space-y-0.5 p-0">
        {items.map((item) => {
          const isFolder = item.type === "folder";
          const hasChildren = isFolder && item.children?.length > 0;
          const isExpanded = Boolean(expandedFolders[item.id]);
          const isSelected = !isFolder && item.id === selectedFileId;

          return (
            <li key={item.id}>
              <div
                className={`group flex items-center gap-2 rounded-sm border px-2 py-1.5 text-sm transition-colors ${
                  isFolder
                    ? "cursor-pointer border-sv-border/20 text-[#d8ebf8] hover:border-sv-cyan/40 hover:bg-[#11233d]"
                    : isSelected
                      ? "cursor-pointer border-sv-cyan/60 bg-[#123357] text-[#eaf7ff]"
                      : "cursor-pointer border-transparent text-sv-text hover:bg-[#0f1d33]"
                }`}
                style={{ paddingLeft: `${10 + depth * 16}px` }}
                onClick={() => {
                  if (isFolder) {
                    toggleFolder(item.id);
                    return;
                  }

                  setSelectedFileId(item.id);
                }}
                role={isFolder ? "button" : undefined}
                tabIndex={isFolder ? 0 : undefined}
                onKeyDown={
                  isFolder
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleFolder(item.id);
                        }
                      }
                    : undefined
                }
              >
                <span
                  className={`w-2 text-[10px] leading-none ${
                    isFolder ? "text-sv-cyan" : "text-sv-label"
                  }`}
                  aria-hidden="true"
                >
                  {isFolder ? (isExpanded ? "v" : ">") : ""}
                </span>
                <span
                  className={`w-6 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                    isFolder ? "text-[#5ce0ff]" : "text-[#8ea8bc]"
                  }`}
                  aria-hidden="true"
                >
                  {isFolder ? "DIR" : "FILE"}
                </span>
                <span className="truncate font-medium">{item.name}</span>
              </div>

              {hasChildren && isExpanded ? renderTree(item.children, depth + 1) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="grid min-h-screen grid-rows-[56px_1fr] bg-sv-bg text-[#eaf6ff]">
      <header className="flex items-center justify-between border-b border-sv-border bg-sv-top px-5">
        <div className="text-[11px] font-bold tracking-[0.15em] text-[#36d3ea]">
          SECUREVAULT
        </div>
        <button
          type="button"
          className="cursor-pointer border border-sv-border bg-[#0a1729] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-sv-cyan"
        >
          Upload
        </button>
      </header>

      <main className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_minmax(320px,1fr)_280px]">
        <aside
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Explorer"
        >
          <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            Explorer
          </h2>
          <div className="p-3">
            {vaultItems.length === 0 ? (
              <p className="text-sm text-sv-text">Loading vault data...</p>
            ) : (
              renderTree(vaultItems)
            )}
          </div>
        </aside>

        <section
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Details"
        >
          <h1 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            {selectedFile ? "File Selected" : "No Item Selected"}
          </h1>
          <div className="p-4 text-sm leading-relaxed text-sv-text">
            {selectedFile
              ? `Selected file: ${selectedFile.name}`
              : `${vaultItems.length} root item(s) loaded from vault data.`}
          </div>
        </section>

        <aside
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Properties"
        >
          <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            Properties
          </h2>
          <div className="p-4 text-sm leading-relaxed text-sv-text">
            Metadata panel will render here.
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
