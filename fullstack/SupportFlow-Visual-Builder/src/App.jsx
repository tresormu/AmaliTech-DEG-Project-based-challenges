import AppHeader from "./components/AppHeader";
import CanvasNodeList from "./components/CanvasNodeList";
import NodeEditorPanel from "./components/NodeEditorPanel";
import { useFlowNodes } from "./hooks/useFlowNodes";

function App() {
  const { nodes, canvasSize } = useFlowNodes();

  return (
    <div className="grid min-h-screen grid-rows-[72px_1fr] bg-sf-bg text-sf-text">
      <AppHeader />

      <main className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1fr_320px]">
        <CanvasNodeList nodes={nodes} canvasSize={canvasSize} />
        <NodeEditorPanel nodeCount={nodes.length} />
      </main>
    </div>
  );
}

export default App;
