
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";


export default function MainFeed() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { category, industry, sort }
  const [posts, SetPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Declaring error

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


   // loader UI
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  // Start with everything
  let list = [...posts];

  // 1) Category filter (advice/trends/events/community)
  if (filters?.category && filters.category !== "all") {
    list = list.filter((p) => p.category === filters.category);
  }

  // 2) Industry filter (florists/design/technology/Beauty/fashion)
  if (filters?.industry && filters.industry !== "all") {
    list = list.filter((p) => p.industry === filters.industry);
  }

  // 3) Sort (newest/popular/nearby)
  if (filters?.sort === "newest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters?.sort === "popular") {
    // TODO: later sort by likes/comments
  } else if (filters?.sort === "nearby") {
    // TODO: later sort by distance to user
  }

  return (
    <div>
      <h1>Main Feed</h1>
      <ul>
        {list.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> — {post.category} · {post.industry} · {post.date}
          </li>
        ))}
      </ul>
    </div>
  );
}