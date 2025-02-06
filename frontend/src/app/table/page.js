"use client";

import { useEffect, useState } from "react";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                setPosts(data.slice(0, 10));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>ID</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Title</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{post.id}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{post.title}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{post.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
