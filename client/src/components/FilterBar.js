export default function FilterBar({ onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category */}
        <div>
          <label htmlFor="category" className="text-sm font-medium text-gray-700 mr-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            className="rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="all">All</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="text-sm font-medium text-gray-700 mr-2">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            onChange={handleChange}
            className="rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="all">All</option>
            <option value="retail">Retail</option>
            <option value="tech">Tech</option>
            <option value="health">Health</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
            Sort
          </label>
          <select
            id="sort"
            name="sort"
            onChange={handleChange}
            className="rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="nearby">Nearby</option>
          </select>
        </div>
      </div>
    </div>
  );
}
