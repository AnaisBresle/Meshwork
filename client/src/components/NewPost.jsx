import { useState, useEffect } from "react";
import { useSession } from "../contexts/SessionContext";


const NewPost = ({ setPosts } ) => {
  const { user, token } = useSession();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {

        console.error("Failed to fetch topics:", err);
      }
    };
    fetchTopics();
  }, []);

  if (!user) return <p>Loading user info...</p>;


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topicId, setTopicId] = useState(null);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
    

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

    // Validations
  if (!content) {
    displayError('Post/Comment cannot be empty');
    return;
  }


  const newPostData = {
    title,
    content,
    userId: user.id,
    topicId: topicId || null,
    };

  try {
      const response = await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,  
       },
      body: JSON.stringify(newPostData),
    });

    const data = await response.json().catch(() => ({})); // never fails

    if (!response.ok) {
      const message = data.error || data.message || "Failed to create post";
      throw new Error(message);
    }

    // Update local posts list
      setPosts((prev) => [...prev, data]);

    // Reset form
      setTitle("");
      setContent("");
      setTopicId(null);
    
    

console.log("Post created successfully:", data);
    } catch (error) {
      console.error("Post creation failed", error.message);
      displayError(error.message);
    }
  };
 


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h1> 📝  Create a new Post</h1>
      
      <div >
        <label htmlFor="title" className="block text-gray-700">Subject</label>
        <input
          id="title"
          type="text"
          placeholder="What is the subject of your post (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="topic">Topic</label>
        <select
          id="topic"
          value={topicId || ""}
          onChange={(e) => setTopicId(Number(e.target.value))}
        >
          <option value="">Select a topic</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-2 border rounded-md"
        ></textarea>
      </div>

         
     
     {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[var(--primary)] text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Post
      </button>
      
    </form>
  );
};

export default NewPost;