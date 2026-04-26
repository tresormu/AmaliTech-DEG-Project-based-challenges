import { useState } from "react";

function FlowPreview({ nodes }) {
  const startNode = nodes.find((n) => n.type === "start") || nodes[0];
  const [currentNodeId, setCurrentNodeId] = useState(startNode?.id);

  const currentNode = nodes.find((n) => n.id === currentNodeId);

  const handleRestart = () => {
    setCurrentNodeId(startNode?.id);
  };

  const handleNext = (nextId) => {
    if (!nextId) return;
    setCurrentNodeId(String(nextId));
  };

  if (!currentNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-sf-pane rounded-xl shadow-lg border border-sf-border">
        <p className="text-sf-mid">Error: Could not find node with ID {currentNodeId}</p>
        <button
          onClick={handleRestart}
          className="mt-4 px-6 py-2 bg-sf-primary text-white rounded-lg hover:bg-sf-primaryDark transition"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 p-4">
      <div className="p-8 bg-white rounded-2xl shadow-xl border border-sf-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sf-primary/20 via-sf-primary to-sf-primary/20" />
        
        <p className="text-[10px] font-bold uppercase tracking-widest text-sf-mid mb-2">Bot Message</p>
        <h2 className="text-2xl font-semibold text-sf-deep leading-tight">{currentNode.text}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {currentNode.options?.length > 0 ? (
          <>
            <p className="text-xs font-semibold text-sf-mid uppercase tracking-widest ml-1">Your Response</p>
            {currentNode.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(option.nextId)}
                className="w-full p-4 text-left bg-sf-pane border border-sf-border rounded-xl hover:border-sf-primary hover:bg-sf-primary/5 transition-all duration-200 group flex justify-between items-center"
              >
                <span className="font-medium text-sf-text">{option.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sf-primary">→</span>
              </button>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <div className="p-4 bg-sf-primary/5 border border-sf-primary/20 rounded-xl text-center">
              <p className="text-sm font-medium text-sf-mid">Conversation Ended</p>
            </div>
            <button
              onClick={handleRestart}
              className="w-full p-4 bg-sf-primary text-white font-bold rounded-xl shadow-lg hover:bg-sf-primaryDark transition-all active:scale-[0.98]"
            >
              Restart Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowPreview;
