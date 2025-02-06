"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const posts = await response.json();

                // Group by userId
                const groupedData = posts.reduce((acc, post) => {
                    acc[post.userId] = (acc[post.userId] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.keys(groupedData).map((key, index) => ({
                    name: `User ${key}`,
                    value: groupedData[key],
                    color: COLORS[index % COLORS.length],
                }));

                setData(chartData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Pie Chart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}
        </div>
    );
}
