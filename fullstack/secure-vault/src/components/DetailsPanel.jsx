function DetailsPanel({ selectedFile, rootItemCount }) {
  return (
    <section
      className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
      aria-label="Details"
    >
      <h1 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
        {selectedFile ? "File Selected" : "No Item Selected"}
      </h1>
      <div className="p-4 text-sm leading-relaxed text-sv-text">
        {selectedFile
          ? `Selected file: ${selectedFile.name}`
          : `${rootItemCount} root item(s) loaded from vault data.`}
      </div>
    </section>
  );
}

export default DetailsPanel;
