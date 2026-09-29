"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { visitTimeShare } from "@/lib/data";

export function VisitTimeBar() {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={visitTimeShare} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="oklch(0.7 0.01 95)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.7 0.01 95)" tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "oklch(0.46 0.11 158 / 0.06)" }}
            contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.012 95)", fontSize: 12 }}
            formatter={(v: number) => [`${v.toLocaleString("en-IN")}`, "Visits"]}
          />
          <Bar dataKey="visits" radius={[6, 6, 0, 0]} maxBarSize={46}>
            {visitTimeShare.map((d, i) => (
              <Cell
                key={d.time}
                fill={
                  ["oklch(0.46 0.11 158)", "oklch(0.62 0.1 180)", "oklch(0.78 0.12 80)", "oklch(0.5 0.07 50)"][i]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
