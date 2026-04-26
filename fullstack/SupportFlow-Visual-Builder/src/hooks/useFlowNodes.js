import { useState, useCallback } from "react";
import flowData from "../../flow_data.json";

export const useFlowNodes = () => {
  const [nodes, setNodes] = useState(() => flowData.nodes ?? []);
  const [canvasSize] = useState(() => flowData.meta?.canvas_size ?? { w: 1200, h: 800 });

  const updateNode = useCallback((id, data) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, ...data } : node))
    );
  }, []);

  return { nodes, canvasSize, updateNode };
};
