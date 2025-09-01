import { useState, useEffect } from "react";
import NewComment from "./NewComment";
import { useSession } from "../contexts/SessionContext";

export default function PostCard({ post }) {
  const { user } = useSession();

  console.log("Post user:", post.user);

  const normalizeUser = (user) => ({
  firstname: user.firstname || "Unknown",
  lastname: user.lastname || "User",
  Profile: {
    picture: user?.Profile?.picture
      ? user.Profile.picture.startsWith("http")
        ? user.Profile.picture
        : `http://localhost:3001${user.Profile.picture}`
      : "/profile/default-avatar.png"
  }
});

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postComments, setPostComments] = useState([]);

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${post.id}/comments`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        console.log("Fetched comments:", data); // <--- log the full data
      setPostComments(data);

        setPostComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [post.id]);

  // Add a new comment locally after posting
  const handleNewComment = (comment) => {
    const commentWithUser = {
      ...comment,
      id: Date.now(),
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        Profile: { picture: user.picture || "/profile/default-avatar.png" },
      },
    };
    setPostComments((prev) => [...prev, commentWithUser]);
    setShowCommentForm(false);
  };

  // Render avatar from Profile
  const renderAvatar = (user) => (
  <img
    src={user?.Profile?.picture || "/profile/default-avatar.png"}
    alt={`${user?.firstname || "Unknown"} ${user?.lastname || "User"}`}
    className="h-full w-full object-cover"
  />
);

  
  // Header user info
  const postUser = normalizeUser(post.user);

  return (
    <div className="bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--border)] p-5 hover:shadow-md transition">
      {/* header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-[var(--background)] flex items-center justify-center font-medium text-[var(--text-secondary)] overflow-hidden">
          {renderAvatar(postUser)}
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {`${postUser.firstname} ${postUser.lastname}`}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {new Date(post.created_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* title + content */}
      <h2 className="font-bold text-xl text-[var(--primary)] mb-2">{post.title}</h2>
      <p className="text-[var(--text-primary)] leading-relaxed">{post.content}</p>

      {/* footer actions */}
      <div className="flex gap-6 mt-5 text-sm">
        <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
          <span className="text-lg">♡</span> Like
        </button>

        <button
          className="flex items-center gap-1 text-gray-500 hover:text-[var(--brand-primary,#2563eb)] transition"
          onClick={() => setShowCommentForm((prev) => !prev)}
        >
          <span className="text-lg">💬</span> Comment
        </button>

        <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
          <span className="text-lg">↗</span> Share
        </button>
      </div>

      {/* comments list */}
      {postComments.length > 0 && (
        <div className="mt-4 space-y-3">
         {postComments.map((comment) => {
  const commentUser = normalizeUser(comment.user);
  return (
    <div key={comment.id} className="border-l-2 border-[var(--border)] pl-3 text-sm text-[var(--text-primary)]">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-6 w-6 rounded-full overflow-hidden">
          {renderAvatar(commentUser)}
        </div>
        <p className="font-semibold">{`${commentUser.firstname} ${commentUser.lastname}`}</p>
      </div>
      <p>{comment.content}</p>
    </div>
  );
})}
        </div>
      )}

      {showCommentForm && <NewComment parentPost={post} onCommentAdded={handleNewComment} />}
    </div>
  );
}
