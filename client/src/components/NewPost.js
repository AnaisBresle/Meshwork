import { useState } from "react";
import { useSession } from "../contexts/SessionContext";
import {
  LinkIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const NewPost = () => {
  const { user } = useSession();

  if (!user) return <p>Loading user info...</p>;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const displayError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      displayError("Please fill in both title and content.");
      return;
    }

    const newPost = {
      title,
      content,
      link: link || null,
      image: image || null,
      video: video || null,
      createdBy: user?.id || "guest",
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);

      setTitle("");
      setContent("");
      setLink("");
      setImage("");
      setVideo("");
    } catch (err) {
      console.error("Failed to create post:", err);
      displayError("Post failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h1 className="text-xl font-bold text-[var(--primary)] flex items-center gap-2">
        📝 Create a new Post
      </h1>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="3"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Link */}
      <div className="flex items-center gap-2">
        <LinkIcon className="h-5 w-5 text-[var(--primary)]" />
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Add a link (https://...)"
          className="flex-1 px-4 py-2 border rounded-md"
        />
      </div>

      {/* Image */}
      <div className="flex items-center gap-2">
        <PhotoIcon className="h-5 w-5 text-[var(--primary)]" />
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Add image URL"
          className="flex-1 px-4 py-2 border rounded-md"
        />
      </div>

      {/* Video */}
      <div className="flex items-center gap-2">
        <VideoCameraIcon className="h-5 w-5 text-[var(--primary)]" />
        <input
          type="url"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="Add video URL"
          className="flex-1 px-4 py-2 border rounded-md"
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--primary)] text-white font-bold py-2 px-4 rounded-md"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default NewPost;
