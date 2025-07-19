import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  const pieData = [
    { name: "Accepted Products", value: stats.acceptedProducts },
    { name: "Pending Products", value: stats.pendingProducts },
    { name: "Reviews", value: stats.totalReviews },
    { name: "Users", value: stats.totalUsers },
  ];

  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="px-4 py-10 space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        📊 Admin Statistics
      </h2>

      {/* Responsive Layout */}
      <div className="flex flex-col-reverse lg:flex-row-reverse justify-center items-center gap-10">
        {/* Table */}
        <div className="w-full max-w-md">
          <h3 className="text-lg font-semibold mb-3 text-center">🔢 Summary</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th>Type</th>
                  <th>Count</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{item.name}</td>
                    <td>{item.value}</td>
                    <td>{((item.value / totalValue) * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
