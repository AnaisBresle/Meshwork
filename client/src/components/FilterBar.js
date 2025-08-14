export default function FilterBar({ onChange }) {
  const handleCategory = (e) => onChange?.({ category: e.target.value });
  const handleIndustry = (e) => onChange?.({ industry: e.target.value }); // <-- new
  const handleSort = (e) => onChange?.({ sort: e.target.value });

  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 16px", borderBottom: "1px solid #eee", background: "#fafafa" }}>
      {/* Category */}
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 14, color: "#555" }}>Category</span>
        <select onChange={handleCategory} defaultValue="all">
          <option value="all">All</option>
          <option value="advice">Advice</option>
          <option value="trends">Trend</option>
          <option value="events">Events</option>
          <option value="community">Community</option>
        </select>
      </label>

      {/* Industry */}
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 14, color: "#555" }}>Industry</span>
        <select onChange={handleIndustry} defaultValue="all"> {/* <-- use handleIndustry */}
          <option value="all">All</option>
          <option value="florists">Florists</option>
          <option value="design">Design</option>
          <option value="technology">Technology</option>
          <option value="beauty">Hair &amp; Beauty</option>
          <option value="fashion">Fashion</option>
        </select>
      </label>

      {/* Sort */}
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 14, color: "#555" }}>Sort</span>
        <select onChange={handleSort} defaultValue="newest">
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
          <option value="nearby">Nearby</option>
        </select>
      </label>
    </div>
  );
}