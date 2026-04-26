import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const NODE_WIDTH = 240;
const DEFAULT_NODE_HEIGHT = 112;

function CanvasNodeList({ nodes, canvasSize, selectedNodeId, onSelectNode, onUpdateNode }) {
  const viewportRef = useRef(null);
  const nodesRef = useRef({});
  const canvasWidth = canvasSize?.w ?? 1200;
  const canvasHeight = canvasSize?.h ?? 800;
  
  const [viewportWidth, setViewportWidth] = useState(0);
  const [nodeHeights, setNodeHeights] = useState({});
  const [draggingNode, setDraggingNode] = useState(null);

  // Monitor viewport size for responsive scaling
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const updateWidth = () => {
      const innerWidth = viewport.clientWidth - 24;
      setViewportWidth(innerWidth > 0 ? innerWidth : canvasWidth);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [canvasWidth]);

  // Sync connector redraw by observing node height changes in real-time
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      setNodeHeights((prev) => {
        const next = { ...prev };
        let changed = false;

        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-node-id");
          if (id) {
            const h = entry.target.offsetHeight;
            if (prev[id] !== h) {
              next[id] = h;
              changed = true;
            }
          }
        });

        return changed ? next : prev;
      });
    });

    Object.values(nodesRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [nodes]);

  const canvasScale = viewportWidth > 0 ? Math.min(1, viewportWidth / canvasWidth) : 1;

  // Drag and Drop Logic
  const handleMouseDown = (e, node) => {
    if (e.button !== 0) return; // Only left click
    onSelectNode(node.id);
    
    setDraggingNode({
      id: node.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: node.position?.x ?? 0,
      initialY: node.position?.y ?? 0,
    });

    e.stopPropagation();
  };

  useEffect(() => {
    if (!draggingNode) return undefined;

    const handleMouseMove = (e) => {
      const dx = (e.clientX - draggingNode.startX) / canvasScale;
      const dy = (e.clientY - draggingNode.startY) / canvasScale;
      
      const newX = Math.round(draggingNode.initialX + dx);
      const newY = Math.round(draggingNode.initialY + dy);
      
      onUpdateNode(draggingNode.id, {
        position: { x: newX, y: newY }
      });
    };

    const handleMouseUp = () => {
      setDraggingNode(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingNode, canvasScale, onUpdateNode]);

  const edges = useMemo(() => {
    const nodeById = new Map(nodes.map((node) => [String(node.id), node]));
    const uniqueEdges = new Set();

    return nodes.flatMap((node) => {
      const sourceId = String(node.id);
      const sourceHeight = nodeHeights[node.id] ?? DEFAULT_NODE_HEIGHT;
      const sourceX = (node.position?.x ?? 0) + NODE_WIDTH / 2;
      const sourceY = (node.position?.y ?? 0) + sourceHeight;

      return (node.options ?? [])
        .map((option) => {
          const targetId = String(option.nextId ?? "");
          const targetNode = nodeById.get(targetId);

          if (!targetNode) return null;

          const edgeKey = `${sourceId}->${targetId}`;
          if (uniqueEdges.has(edgeKey)) return null;
          uniqueEdges.add(edgeKey);

          const targetX = (targetNode.position?.x ?? 0) + NODE_WIDTH / 2;
          const targetY = targetNode.position?.y ?? 0;
          const controlOffset = Math.max(64, Math.abs(targetY - sourceY) * 0.45);

          return {
            id: edgeKey,
            d: `M ${sourceX} ${sourceY} C ${sourceX} ${sourceY + controlOffset}, ${targetX} ${targetY - controlOffset}, ${targetX} ${targetY}`,
          };
        })
        .filter(Boolean);
    });
  }, [nodes, nodeHeights]);

  return (
    <section
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)] select-none"
      aria-label="Flow canvas"
    >
      <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid flex justify-between items-center">
        <span>Canvas</span>
        {draggingNode && <span className="text-[10px] text-sf-primary animate-pulse normal-case">Moving Node #{draggingNode.id}...</span>}
      </div>
      <div className="p-4">
        {nodes.length === 0 ? (
          <p className="text-sm text-[#2f5b42]">Loading flow data...</p>
        ) : (
          <div
            ref={viewportRef}
            className="overflow-auto rounded-lg border border-[#d2e8da] bg-[#f7fcf9] p-3"
          >
            <div
              className="relative"
              style={{
                width: `${canvasWidth * canvasScale}px`,
                height: `${canvasHeight * canvasScale}px`,
              }}
            >
              <ul
                className="relative m-0 list-none p-0 origin-top-left"
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  transform: `scale(${canvasScale})`,
                }}
              >
                <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6faa8b" />
                    </marker>
                  </defs>
                  {edges.map((edge) => (
                    <path
                      key={edge.id}
                      d={edge.d}
                      fill="none"
                      stroke="#6faa8b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd="url(#arrowhead)"
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>

                {nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isDragging = draggingNode?.id === node.id;
                  const isStart = node.type === "start";
                  const isEnd = node.type === "end";

                  return (
                    <li
                      key={node.id}
                      ref={(el) => (nodesRef.current[node.id] = el)}
                      data-node-id={node.id}
                      onMouseDown={(e) => handleMouseDown(e, node)}
                      className={`absolute w-[240px] cursor-move rounded-xl border-2 transition-all duration-200 px-4 py-3 text-sm ${
                        isSelected
                          ? "z-10 border-sf-primary bg-white shadow-[0_0_0_4px_rgba(25,135,84,0.15),0_12px_32px_rgba(25,135,84,0.2)] scale-[1.02]"
                          : "border-sf-border bg-white shadow-[0_8px_20px_rgba(27,74,50,0.1)] hover:border-[#6faa8b] hover:shadow-[0_8px_24px_rgba(27,74,50,0.15)]"
                      } ${isDragging ? "opacity-90 ring-4 ring-sf-primary/20 cursor-grabbing" : ""} ${
                        isStart ? "border-l-[6px] border-l-sf-primary" : ""
                      } ${isEnd ? "border-l-[6px] border-l-red-400" : ""}`}
                      style={{
                        left: `${node.position?.x ?? 0}px`,
                        top: `${node.position?.y ?? 0}px`,
                        minHeight: `${DEFAULT_NODE_HEIGHT}px`,
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-sf-primary" : "text-sf-mid"}`}>
                          Node #{node.id}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border ${
                          isStart ? "bg-sf-primary/10 text-sf-primary border-sf-primary/20" : 
                          isEnd ? "bg-red-50 text-red-500 border-red-100" :
                          "bg-sf-bg text-sf-mid border-sf-border/50"
                        }`}>
                          {node.type}
                        </span>
                      </div>
                      <p className="text-sf-text leading-relaxed font-medium">
                        {node.text}
                      </p>
                      <div className="mt-3 pt-2 border-t border-sf-border/30 flex items-center gap-2">
                        <div className="flex -space-x-1">
                          {(node.options ?? []).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-sf-primary/40 ring-1 ring-white" />
                          ))}
                        </div>
                        <span className="text-[10px] text-sf-mid font-semibold uppercase tracking-tight">
                          {node.options?.length ?? 0} Options
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CanvasNodeList;
