
import { useOutletContext } from "react-router-dom";
import PostsList from "../components/PostsList";


export default function MainFeed() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { topic, sort }
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Main Feed</h1>
    <PostsList filters={filters} />
    </div>
  );
}