import { useState } from "react";
import flowData from "../../flow_data.json";

export const useFlowNodes = () => {
  const [nodes] = useState(() => flowData.nodes ?? []);
  const [canvasSize] = useState(() => flowData.meta?.canvas_size ?? { w: 1200, h: 800 });

  return { nodes, canvasSize };
};
