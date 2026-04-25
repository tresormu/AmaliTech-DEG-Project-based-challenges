import { useEffect, useState } from "react";
import vaultData from "../data.json";

function App() {
  const [vaultItems, setVaultItems] = useState([]);

  useEffect(() => {
    setVaultItems(vaultData);
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[56px_1fr] bg-sv-bg text-[#eaf6ff]">
      <header className="flex items-center justify-between border-b border-sv-border bg-sv-top px-5">
        <div className="text-[11px] font-bold tracking-[0.15em] text-[#36d3ea]">
          SECUREVAULT
        </div>
        <button
          type="button"
          className="cursor-pointer border border-sv-border bg-[#0a1729] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-sv-cyan"
        >
          Upload
        </button>
      </header>

      <main className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_minmax(320px,1fr)_280px]">
        <aside
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Explorer"
        >
          <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            Explorer
          </h2>
          <div className="p-3">
            {vaultItems.length === 0 ? (
              <p className="text-sm text-sv-text">Loading vault data...</p>
            ) : (
              <ul className="m-0 space-y-1 p-0">
                {vaultItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 border border-transparent px-2 py-1.5 text-sm text-sv-text"
                  >
                    <span className="text-xs text-sv-cyan" aria-hidden="true">
                      {item.type === "folder" ? "▸" : "•"}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Details"
        >
          <h1 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            No Item Selected
          </h1>
          <div className="p-4 text-sm leading-relaxed text-sv-text">
            {vaultItems.length} root item(s) loaded from vault data.
          </div>
        </section>

        <aside
          className="flex min-h-[220px] flex-col border border-sv-border bg-sv-panel lg:min-h-[360px]"
          aria-label="Properties"
        >
          <h2 className="m-0 border-b border-sv-border p-3 text-[11px] uppercase tracking-[0.12em] text-sv-label">
            Properties
          </h2>
          <div className="p-4 text-sm leading-relaxed text-sv-text">
            Metadata panel will render here.
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
