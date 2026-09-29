"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyTrend } from "@/lib/data";

export function RevenueLine() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyTrend} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 95)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.7 0.01 95)" tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="oklch(0.7 0.01 95)"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${(v / 1_000_000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.012 95)", fontSize: 12 }}
            formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="oklch(0.5 0.07 50)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "oklch(0.5 0.07 50)" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="oklch(0.46 0.11 158)"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
