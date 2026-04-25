function PropertiesPanel({ selectedFile, selectedFileType, selectedFileSize }) {
  return (
    <aside
      className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
      aria-label="Properties"
    >
      <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
        Properties
      </h2>
      <div className="space-y-4 p-4 text-sm leading-relaxed text-sv-text">
        <div className="border-b border-sv-border/60 pb-2">
          <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Name</p>
          <p className="mt-1 break-all font-medium text-[#eaf7ff]">{selectedFile?.name ?? "-"}</p>
        </div>

        <div className="border-b border-sv-border/60 pb-2">
          <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Type</p>
          <p className="mt-1 font-medium text-[#eaf7ff]">{selectedFileType}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-sv-label">Size</p>
          <p className="mt-1 font-medium text-[#eaf7ff]">{selectedFileSize}</p>
        </div>
      </div>
    </aside>
  );
}

export default PropertiesPanel;
