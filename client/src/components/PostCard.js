export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
      {/* header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
          {post.businessName?.[0] || "B"}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{post.businessName || "Business Name"}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* title + content */}
      <h2 className="font-bold text-xl text-[var(--brand-primary,#2563eb)] mb-2">
        {post.title}
      </h2>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      {/* footer actions */}
      <div className="flex gap-6 mt-5 text-sm">
        <button className="flex items-center gap-1 text-gray-500 hover:text-[var(--brand-primary,#2563eb)] transition">
          <span className="text-lg">♡</span> Like
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-[var(--brand-primary,#2563eb)] transition">
          <span className="text-lg">💬</span> Comment
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-[var(--brand-primary,#2563eb)] transition">
          <span className="text-lg">↗</span> Share
        </button>
      </div>
    </div>
  );
}
