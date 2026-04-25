export const buildInitialExpandedState = (items) => {
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

const collectDescendantIds = (nodes) => {
  const ids = [];
  for (const node of nodes) {
    ids.push(node.id);
    if (node.children?.length) {
      ids.push(...collectDescendantIds(node.children));
    }
  }
  return ids;
};

export const buildFilteredTree = (items, query) => {
  const loweredQuery = query.trim().toLowerCase();
  if (!loweredQuery) {
    return { tree: items, autoExpanded: new Set() };
  }

  const autoExpanded = new Set();

  const walk = (nodes) => {
    const result = [];

    for (const node of nodes) {
      const nameMatches = node.name.toLowerCase().includes(loweredQuery);
      const children = node.children ?? [];
      const filteredChildren = walk(children);
      const childMatchExists = filteredChildren.length > 0;

      if (!nameMatches && !childMatchExists) {
        continue;
      }

      if (childMatchExists) {
        autoExpanded.add(node.id);
      }

      if (nameMatches && node.type === "folder" && children.length) {
        autoExpanded.add(node.id);
        autoExpanded.add(...collectDescendantIds(children));
        result.push({ ...node, children });
        continue;
      }

      result.push({ ...node, children: filteredChildren });
    }

    return result;
  };

  return { tree: walk(items), autoExpanded };
};

export const findNodeById = (items, id) => {
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

export const flattenVisibleItems = (items, isExpandedById, depth = 0, parentId = null) => {
  const result = [];

  for (const item of items) {
    result.push({ item, depth, parentId });

    const isFolder = item.type === "folder";
    const isExpanded = isExpandedById(item.id);

    if (isFolder && isExpanded && item.children?.length) {
      result.push(...flattenVisibleItems(item.children, isExpandedById, depth + 1, item.id));
    }
  }

  return result;
};
