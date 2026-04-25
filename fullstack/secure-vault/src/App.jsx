import AppHeader from "./components/AppHeader";
import DetailsPanel from "./components/DetailsPanel";
import ExplorerPanel from "./components/ExplorerPanel";
import PropertiesPanel from "./components/PropertiesPanel";
import { useVaultExplorer } from "./hooks/useVaultExplorer";

function App() {
  const {
    vaultItems,
    treeItems,
    searchTerm,
    setSearchTerm,
    selectedFile,
    selectedFileType,
    selectedFileSize,
    selectedFileId,
    effectiveFocusedItemId,
    isExpandedById,
    handleExplorerKeyDown,
    onItemClick,
    onItemKeyDown,
    attachItemRef
  } = useVaultExplorer();

  return (
    <div className="grid min-h-screen grid-rows-[56px_1fr] bg-sv-bg text-[#eaf6ff]">
      <AppHeader />

      <main className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_minmax(320px,1fr)_280px]">
        <ExplorerPanel
          vaultItems={vaultItems}
          treeItems={treeItems}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          handleExplorerKeyDown={handleExplorerKeyDown}
          isExpandedById={isExpandedById}
          selectedFileId={selectedFileId}
          focusedItemId={effectiveFocusedItemId}
          onItemClick={onItemClick}
          onItemKeyDown={onItemKeyDown}
          attachItemRef={attachItemRef}
        />

        <DetailsPanel selectedFile={selectedFile} rootItemCount={vaultItems.length} />

        <PropertiesPanel
          selectedFile={selectedFile}
          selectedFileType={selectedFileType}
          selectedFileSize={selectedFileSize}
        />
      </main>
    </div>
  );
}

export default App;
