function TreeNode({
  item,
  depth,
  isExpandedById,
  selectedFileId,
  focusedItemId,
  onItemClick,
  onItemKeyDown,
  attachItemRef
}) {
  const isFolder = item.type === "folder";
  const hasChildren = isFolder && item.children?.length > 0;
  const isExpanded = isExpandedById(item.id);
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
        onClick={() => onItemClick(item)}
        ref={(element) => attachItemRef(item.id, element)}
        role="treeitem"
        aria-selected={!isFolder ? isSelected : undefined}
        aria-expanded={isFolder ? isExpanded : undefined}
        tabIndex={isFocused ? 0 : -1}
        onKeyDown={(event) => onItemKeyDown(event, item)}
      >
        <span
          className={`w-2 text-[10px] leading-none ${isFolder ? "text-sv-cyan" : "text-sv-label"}`}
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

      {hasChildren && isExpanded ? (
        <ul className="m-0 space-y-0.5 p-0">
          {item.children.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              isExpandedById={isExpandedById}
              selectedFileId={selectedFileId}
              focusedItemId={focusedItemId}
              onItemClick={onItemClick}
              onItemKeyDown={onItemKeyDown}
              attachItemRef={attachItemRef}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function ExplorerPanel({
  vaultItems,
  treeItems,
  searchTerm,
  onSearchChange,
  handleExplorerKeyDown,
  isExpandedById,
  selectedFileId,
  focusedItemId,
  onItemClick,
  onItemKeyDown,
  attachItemRef
}) {
  return (
    <aside
      className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
      aria-label="Explorer"
    >
      <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
        Explorer
      </h2>
      <div className="border-b border-sv-border p-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search files..."
          className="w-full border border-sv-border bg-[#08111d] px-2 py-1.5 text-xs text-[#d7ebfa] placeholder:text-sv-label focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ed4e2]"
        />
      </div>
      <div className="p-3" onKeyDown={handleExplorerKeyDown} role="tree">
        {vaultItems.length === 0 ? (
          <p className="text-sm text-sv-text">Loading vault data...</p>
        ) : treeItems.length === 0 ? (
          <p className="text-sm text-sv-text">No matching files or folders.</p>
        ) : (
          <ul className="m-0 space-y-0.5 p-0">
            {treeItems.map((item) => (
              <TreeNode
                key={item.id}
                item={item}
                depth={0}
                isExpandedById={isExpandedById}
                selectedFileId={selectedFileId}
                focusedItemId={focusedItemId}
                onItemClick={onItemClick}
                onItemKeyDown={onItemKeyDown}
                attachItemRef={attachItemRef}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default ExplorerPanel;
