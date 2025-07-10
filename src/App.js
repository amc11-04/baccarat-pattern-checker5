import React, { useState } from "react";

function detectPattern(sequence) {
  if (sequence.length < 4) return "กรุณาใส่ผลมากกว่า 4 ตา";
  const last = sequence.slice(-4);
  const isSame = (arr) => arr.every((v) => v === arr[0]);

  if (isSame(last)) return "เค้าไพ่มังกร";
  if (last[0] === last[2] && last[1] === last[3] && last[0] !== last[1])
    return "เค้าไพ่ปิงปอง";

  let twoCut = true;
  for (let i = 2; i < sequence.length; i += 3) {
    if (
      sequence[i] === sequence[i - 1] &&
      sequence[i] === sequence[i - 2]
    ) {
      twoCut = false;
      break;
    }
  }
  if (twoCut) return "เค้าไพ่สองตัวตัด";

  return "ยังไม่พบรูปแบบชัดเจน";
}

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleAdd = () => {
    const val = input.trim().toUpperCase();
    if (!["B", "P", "T"].includes(val)) return;
    const newResults = [...results, val];
    setResults(newResults);
    setInput("");
  };

  const pattern = detectPattern(results);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>🃏 ตัวช่วยดูเค้าไพ่บาคาร่า</h1>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ใส่ B / P / T"
        />
        <button onClick={handleAdd}>เพิ่ม</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5, marginTop: 20 }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              backgroundColor:
                r === "B" ? "#EF4444" : r === "P" ? "#3B82F6" : "#9CA3AF",
              color: "white",
              textAlign: "center",
              padding: 10,
              borderRadius: 4,
            }}
          >
            {r}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        🔍 <strong>{pattern}</strong>
      </div>
    </div>
  );
}
