"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { segments } from "@/lib/data";

export function SegmentDonut() {
  const data = segments.map((s) => ({
    name: s.label,
    value: s.count,
    color: s.accent,
  }));
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={96}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid oklch(0.9 0.012 95)",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
            formatter={(v: number) => [`${v.toLocaleString("en-IN")} customers`, "Count"]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
