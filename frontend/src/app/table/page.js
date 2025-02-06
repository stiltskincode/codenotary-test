"use client";

import { useEffect, useState } from "react";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:9000/files");
                const data = await response.json();
                setPosts(data);
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
                            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>File Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Metadata</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.fileName}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{post.fileName}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{post.metadata}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


