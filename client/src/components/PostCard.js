import { useState, useEffect } from "react";
import NewComment from "./NewComment";
import { useSession } from "../contexts/SessionContext";

export default function PostCard({ post }) {
  const { user } = useSession();

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postComments, setPostComments] = useState(
    post.comments.map(c => ({
      ...c,
      user: {
        firstname: c.user?.firstname || "Unknown",
        lastname: c.user?.lastname || "User",
        profile: { picture: c.user?.profile?.picture || "/profile/default-avatar.png" }
      }
    }))
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${post.id}/comments`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setPostComments(
          data.map(c => ({
            ...c,
            user: {
              firstname: c.user?.firstname || "Unknown",
              lastname: c.user?.lastname || "User",
              profile: { picture: c.user?.profile?.picture || "/profile/default-avatar.png" }
            }
          }))
        );
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [post.id]);

  // Called when a new comment is successfully added
  const handleNewComment = (comment) => {
    const commentWithUser = {
      ...comment,
      id: Date.now(), // temporary unique id if backend doesn't provide one
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        profile: { picture: user.picture || "/profile/default-avatar.png" }
      }
    };
    setPostComments((prev) => [...prev, commentWithUser]);
    setShowCommentForm(false); // close the form
  };

  const renderAvatar = (user) => (
    <img
      src={user?.profile?.picture || "/profile/default-avatar.png"}
      alt={`${user?.firstname || "Unknown"} ${user?.lastname || "User"}`}
      className="h-full w-full object-cover"
    />
  );

  // Ensure post user has a profile picture
  const postUser = {
    firstname: post.user?.firstname || "Unknown",
    lastname: post.user?.lastname || "User",
    profile: { picture: post.user?.profile?.picture || "/profile/default-avatar.png" }
  };

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
          {postComments.map(comment => (
            <div key={comment.id} className="border-l-2 border-[var(--border)] pl-3 text-sm text-[var(--text-primary)]">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-6 w-6 rounded-full overflow-hidden">{renderAvatar(comment.user)}</div>
                <p className="font-semibold">{`${comment.user.firstname} ${comment.user.lastname}`}</p>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* show NewComment form */}
      {showCommentForm && <NewComment parentPost={post} onCommentAdded={handleNewComment} />}
    </div>
  );
}
