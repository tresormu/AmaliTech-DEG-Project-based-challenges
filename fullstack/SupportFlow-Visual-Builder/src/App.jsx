import { useState } from "react";
import AppHeader from "./components/AppHeader";
import CanvasNodeList from "./components/CanvasNodeList";
import NodeEditorPanel from "./components/NodeEditorPanel";
import { useFlowNodes } from "./hooks/useFlowNodes";

function App() {
  const { nodes, canvasSize, updateNode } = useFlowNodes();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="flex flex-col min-h-screen bg-sf-bg text-sf-text overflow-x-hidden">
      <AppHeader />

      <main className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_320px] flex-1">
        <div className="min-w-0">
          <CanvasNodeList
            nodes={nodes}
            canvasSize={canvasSize}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        </div>
        <div className="shrink-0">
          <NodeEditorPanel
            selectedNode={selectedNode}
            nodeCount={nodes.length}
            onUpdateNode={updateNode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
