export default function PostCard({ post }) {
  return (
    <div className="bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--border)] p-5 hover:shadow-md transition">
      {/* header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-[var(--background)] flex items-center justify-center font-medium text-[var(--text-secondary)]">
          {post.businessName?.[0] || "B"}
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {post.businessName || "Business Name"}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {new Date(post.created_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* title + content */}
      <h2 className="font-bold text-xl text-[var(--primary)] mb-2">
        {post.title}
      </h2>
      <p className="text-[var(--text-primary)] leading-relaxed">{post.content}</p>

      {/* footer actions */}
      <div className="flex gap-6 mt-5 text-sm">
        <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
          <span className="text-lg">♡</span> Like
        </button>
        <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
          <span className="text-lg">💬</span> Comment
        </button>
        <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
          <span className="text-lg">↗</span> Share
        </button>
      </div>
    </div>
  );
}
