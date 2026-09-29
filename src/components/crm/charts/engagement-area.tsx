"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyTrend } from "@/lib/data";

export function EngagementArea() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyTrend} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.46 0.11 158)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="oklch(0.46 0.11 158)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 95)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.7 0.01 95)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.7 0.01 95)" tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid oklch(0.9 0.012 95)",
              fontSize: 12,
            }}
            formatter={(v: number) => [`${v}%`, "Engagement"]}
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="oklch(0.46 0.11 158)"
            strokeWidth={2.5}
            fill="url(#engGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
