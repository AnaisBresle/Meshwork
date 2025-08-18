
import { useOutletContext } from "react-router-dom";
import PostsList from "../components/PostsList";


export default function MainFeed() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { topic, sort }
  
  return (
    <div>
      <h1>Main Feed</h1>
    <PostsList filters={filters} />
    </div>
  );
}