# baccarat-pattern-checker5
// Baccarat Pattern Checker Web App
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const detectPattern = (sequence) => {
  if (sequence.length < 4) return 'กรุณาใส่ผลมากกว่า 4 ตา';
  const last = sequence.slice(-4);
  const isSame = (arr) => arr.every((v) => v === arr[0]);

  if (isSame(last)) return 'เค้าไพ่มังกร';
  if (last[0] === last[2] && last[1] === last[3] && last[0] !== last[1]) return 'เค้าไพ่ปิงปอง';

  let twoCut = true;
  for (let i = 2; i < sequence.length; i += 3) {
    if (sequence[i] === sequence[i - 1] && sequence[i] === sequence[i - 2]) {
      twoCut = false;
      break;
    }
  }
  if (twoCut) return 'เค้าไพ่สองตัวตัด';

  return 'ยังไม่พบรูปแบบชัดเจน';
};

export default function BaccaratPatternChecker() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleAdd = () => {
    const val = input.trim().toUpperCase();
    if (!['B', 'P', 'T'].includes(val)) return;
    const newResults = [...results, val];
    setResults(newResults);
    setInput('');
  };

  const pattern = detectPattern(results);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">🃏 ตัวช่วยดูเค้าไพ่บาคาร่า</h1>
      <div className="flex gap-2">
        <Input placeholder="ใส่ B / P / T" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleAdd}>เพิ่ม</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-2">
            {results.map((r, i) => (
              <div
                key={i}
                className={`text-center rounded p-2 text-white ${r === 'B' ? 'bg-red-500' : r === 'P' ? 'bg-blue-500' : 'bg-gray-500'}`}
              >
                {r}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-lg font-medium">🔍 {pattern}</div>
    </div>
  );
}
