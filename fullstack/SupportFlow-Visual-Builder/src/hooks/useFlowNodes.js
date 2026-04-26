import { useState } from "react";
import flowData from "../../flow_data.json";

export const useFlowNodes = () => {
  const [nodes] = useState(() => flowData.nodes ?? []);
  return { nodes };
};
