import { useEffect, useMemo, useRef, useState } from "react";
import vaultData from "../data.json";

function App() {
  const [vaultItems, setVaultItems] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [focusedItemId, setFocusedItemId] = useState(null);
  const itemRefs = useRef({});

  useEffect(() => {
    setVaultItems(vaultData);
    setExpandedFolders(buildInitialExpandedState(vaultData));
    setFocusedItemId(vaultData[0]?.id ?? null);
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

  const flattenVisibleItems = (items, depth = 0, parentId = null) => {
    const result = [];

    for (const item of items) {
      result.push({ item, depth, parentId });

      const isFolder = item.type === "folder";
      const isExpanded = Boolean(expandedFolders[item.id]);

      if (isFolder && isExpanded && item.children?.length) {
        result.push(...flattenVisibleItems(item.children, depth + 1, item.id));
      }
    }

    return result;
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
  const selectedFileType = selectedFile
    ? selectedFile.type.charAt(0).toUpperCase() + selectedFile.type.slice(1)
    : "-";
  const selectedFileSize = selectedFile?.size ?? "-";
  const visibleItems = useMemo(
    () => flattenVisibleItems(vaultItems),
    [vaultItems, expandedFolders]
  );

  useEffect(() => {
    if (!visibleItems.length) {
      setFocusedItemId(null);
      return;
    }

    const stillVisible = visibleItems.some(({ item }) => item.id === focusedItemId);
    if (!stillVisible) {
      setFocusedItemId(visibleItems[0].item.id);
    }
  }, [focusedItemId, visibleItems]);

  useEffect(() => {
    if (!focusedItemId) return;
    itemRefs.current[focusedItemId]?.focus();
  }, [focusedItemId]);

  const handleExplorerKeyDown = (event) => {
    if (!visibleItems.length) return;

    const activeIndex = visibleItems.findIndex(({ item }) => item.id === focusedItemId);
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const currentEntry = visibleItems[currentIndex];
    const currentItem = currentEntry.item;
    const isFolder = currentItem.type === "folder";
    const hasChildren = isFolder && currentItem.children?.length > 0;
    const isExpanded = Boolean(expandedFolders[currentItem.id]);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
      setFocusedItemId(visibleItems[nextIndex].item.id);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = Math.max(currentIndex - 1, 0);
      setFocusedItemId(visibleItems[prevIndex].item.id);
      return;
    }

    if (event.key === "ArrowRight") {
      if (hasChildren && !isExpanded) {
        event.preventDefault();
        setExpandedFolders((current) => ({ ...current, [currentItem.id]: true }));
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      if (hasChildren && isExpanded) {
        event.preventDefault();
        setExpandedFolders((current) => ({ ...current, [currentItem.id]: false }));
        return;
      }

      if (currentEntry.parentId) {
        event.preventDefault();
        setFocusedItemId(currentEntry.parentId);
      }
      return;
    }

    if (event.key === "Enter") {
      if (!isFolder) {
        event.preventDefault();
        setSelectedFileId(currentItem.id);
      }
    }
  };

  const renderTree = (items, depth = 0) => {
    return (
      <ul className="m-0 space-y-0.5 p-0">
        {items.map((item) => {
          const isFolder = item.type === "folder";
          const hasChildren = isFolder && item.children?.length > 0;
          const isExpanded = Boolean(expandedFolders[item.id]);
          const isSelected = !isFolder && item.id === selectedFileId;
          const isFocused = item.id === focusedItemId;

          return (
            <li key={item.id}>
              <div
                className={`group flex items-center gap-2 rounded-sm border px-2 py-1.5 text-sm transition-colors ${
                  isFolder
                    ? "cursor-pointer border-sv-border/20 text-[#d8ebf8] hover:border-sv-cyan/40 hover:bg-[#11233d]"
                    : isSelected
                      ? "cursor-pointer border-sv-cyan/60 bg-[#123357] text-[#eaf7ff]"
                      : "cursor-pointer border-transparent text-sv-text hover:bg-[#0f1d33]"
                } ${isFocused ? "ring-1 ring-inset ring-[#2ed4e2]" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ed4e2] focus-visible:ring-offset-0`}
                style={{ paddingLeft: `${10 + depth * 16}px` }}
                onClick={() => {
                  setFocusedItemId(item.id);
                  if (isFolder) {
                    toggleFolder(item.id);
                    return;
                  }

                  setSelectedFileId(item.id);
                }}
                ref={(element) => {
                  if (element) {
                    itemRefs.current[item.id] = element;
                  }
                }}
                role="treeitem"
                aria-selected={!isFolder ? isSelected : undefined}
                aria-expanded={isFolder ? isExpanded : undefined}
                tabIndex={isFocused ? 0 : -1}
                onKeyDown={
                  (event) => {
                    if (event.key === " ") {
                      event.preventDefault();
                      if (isFolder) {
                        toggleFolder(item.id);
                      }
                    }
                  }
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
          className="cursor-pointer border border-sv-border bg-[#0a1729] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-sv-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ed4e2]"
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
          <div className="p-3" onKeyDown={handleExplorerKeyDown} role="tree">
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
          <div className="space-y-4 p-4 text-sm leading-relaxed text-sv-text">
            <div className="border-b border-sv-border/60 pb-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Name</p>
              <p className="mt-1 break-all font-medium text-[#eaf7ff]">
                {selectedFile?.name ?? "-"}
              </p>
            </div>

            <div className="border-b border-sv-border/60 pb-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Type</p>
              <p className="mt-1 font-medium text-[#eaf7ff]">{selectedFileType}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Size</p>
              <p className="mt-1 font-medium text-[#eaf7ff]">{selectedFileSize}</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
