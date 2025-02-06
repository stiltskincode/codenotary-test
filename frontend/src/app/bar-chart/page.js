"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const posts = await response.json();

                // Tworzymy dane do wykresu, licząc ilość postów dla każdego użytkownika
                const groupedData = posts.reduce((acc, post) => {
                    acc[post.userId] = (acc[post.userId] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.keys(groupedData).map((key) => ({
                    userId: `User ${key}`,
                    posts: groupedData[key],
                }));

                setData(chartData);
            } catch (error) {
                console.error("Błąd pobierania danych:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Bar Chart</h1>
            {loading ? (
                <p>Ładowanie...</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="userId" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="posts" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
