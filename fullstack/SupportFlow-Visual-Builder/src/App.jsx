import { useState } from "react";
import AppHeader from "./components/AppHeader";
import CanvasNodeList from "./components/CanvasNodeList";
import NodeEditorPanel from "./components/NodeEditorPanel";
import { useFlowNodes } from "./hooks/useFlowNodes";

function App() {
  const { nodes, canvasSize, updateNode } = useFlowNodes();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="flex flex-col min-h-screen bg-sf-bg text-sf-text overflow-x-hidden">
      <AppHeader
        isPreviewMode={isPreviewMode}
        onToggleMode={() => setIsPreviewMode(!isPreviewMode)}
      />

      <main className="grid grid-cols-1 gap-5 p-5 flex-1 overflow-hidden">
        {isPreviewMode ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sf-mid italic">Preview Mode UI Coming Soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] h-full">
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
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
