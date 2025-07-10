import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Gantt } from "frappe-gantt";
import * as XLSX from "xlsx";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws);
      const t = rows.map((r, i) => ({
        id: "task-" + i,
        name: r.Task || "Task " + i,
        start: r.Start,
        end: r.End,
        progress: r.Progress || 0,
      }));
      setTasks(t);
      setTimeout(() => new Gantt("#gantt", t), 100);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React Gantt Demo</h2>
      <input type="file" accept=".xlsx" onChange={handleFile} />
      <div id="gantt" style={{ marginTop: 20 }} />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
