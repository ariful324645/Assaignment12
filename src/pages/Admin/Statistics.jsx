import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  const pieData = [
    { name: "Accepted Products", value: stats.acceptedProducts },
    { name: "Pending Products", value: stats.pendingProducts },
    { name: "Reviews", value: stats.totalReviews },
    { name: "Users", value: stats.totalUsers },
  ];

  // Total sum of all values (for calculating percentage)
  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📊 Admin Statistics
      </h2>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <PieChart width={500} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            innerRadius={60}
            outerRadius={150}
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
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </div>

      {/* Data Summary Table */}
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">🔢 Summary</h3>
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
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
  );
};

export default Statistics;
