
import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfilesList() {
 
 
  const [people, setPosts] = useState([]);
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

  // 1) Topic filter
  if (filters?.topic && filters.topic !== "all") {
    list = list.filter((p) => p.topic === filters.topic);
  }


  // 2) Sort (newest/popular/nearby)
  if (filters?.sort === "newest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters?.sort === "popular") {
    // TODO: later sort by likes/comments
  } else if (filters?.sort === "nearby") {
    // TODO: later sort by distance to user
  }

  return (
    <div>
        <ul>
        {list.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> — {post.Topic.name} · {post.created_date}<br />
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}