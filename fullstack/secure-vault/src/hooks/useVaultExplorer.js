import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import vaultData from "../../data.json";
import {
  buildFilteredTree,
  buildInitialExpandedState,
  findNodeById,
  flattenVisibleItems
} from "../utils/treeUtils";

export const useVaultExplorer = () => {
  const vaultItems = vaultData;
  const [expandedFolders, setExpandedFolders] = useState(() => buildInitialExpandedState(vaultData));
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [focusedItemId, setFocusedItemId] = useState(vaultData[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemRefs = useRef({});

  const selectedFile = selectedFileId ? findNodeById(vaultItems, selectedFileId) : null;
  const selectedFileType = selectedFile
    ? selectedFile.type.charAt(0).toUpperCase() + selectedFile.type.slice(1)
    : "-";
  const selectedFileSize = selectedFile?.size ?? "-";

  const searchResult = useMemo(() => buildFilteredTree(vaultItems, searchTerm), [vaultItems, searchTerm]);
  const treeItems = searchTerm.trim() ? searchResult.tree : vaultItems;

  const isExpandedById = useCallback(
    (id) => (searchTerm.trim() ? searchResult.autoExpanded.has(id) : Boolean(expandedFolders[id])),
    [searchTerm, searchResult.autoExpanded, expandedFolders]
  );

  const visibleItems = useMemo(
    () => flattenVisibleItems(treeItems, isExpandedById),
    [treeItems, isExpandedById]
  );

  const effectiveFocusedItemId = useMemo(() => {
    if (!visibleItems.length) return null;
    if (focusedItemId && visibleItems.some(({ item }) => item.id === focusedItemId)) {
      return focusedItemId;
    }
    return visibleItems[0].item.id;
  }, [focusedItemId, visibleItems]);

  useEffect(() => {
    if (!effectiveFocusedItemId) return;
    itemRefs.current[effectiveFocusedItemId]?.focus();
  }, [effectiveFocusedItemId]);

  const toggleFolder = (folderId) => {
    if (searchTerm.trim()) return;
    setExpandedFolders((current) => ({ ...current, [folderId]: !current[folderId] }));
  };

  const onItemClick = (item) => {
    setFocusedItemId(item.id);
    if (item.type === "folder") {
      toggleFolder(item.id);
      return;
    }
    setSelectedFileId(item.id);
  };

  const onItemKeyDown = (event, item) => {
    if (event.key === " " && item.type === "folder") {
      event.preventDefault();
      toggleFolder(item.id);
    }
  };

  const handleExplorerKeyDown = (event) => {
    if (!visibleItems.length) return;

    const activeIndex = visibleItems.findIndex(({ item }) => item.id === effectiveFocusedItemId);
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const currentEntry = visibleItems[currentIndex];
    const currentItem = currentEntry.item;
    const isFolder = currentItem.type === "folder";
    const hasChildren = isFolder && currentItem.children?.length > 0;
    const isExpanded = isExpandedById(currentItem.id);

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
      if (hasChildren && !isExpanded && !searchTerm.trim()) {
        event.preventDefault();
        setExpandedFolders((current) => ({ ...current, [currentItem.id]: true }));
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      if (hasChildren && isExpanded && !searchTerm.trim()) {
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

    if (event.key === "Enter" && !isFolder) {
      event.preventDefault();
      setSelectedFileId(currentItem.id);
    }
  };

  const attachItemRef = (id, element) => {
    if (element) {
      itemRefs.current[id] = element;
    }
  };

  return {
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
  };
};
