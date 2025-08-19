import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostsList() {
  const { filters } = useOutletContext(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  let list = [...posts];

  if (filters?.topic && filters.topic !== "all") {
    list = list.filter((p) => p.topic === filters.topic);
  }

  if (filters?.sort === "newest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div className="space-y-6">
      {list.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
