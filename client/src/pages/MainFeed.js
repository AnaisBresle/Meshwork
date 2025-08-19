
import { useOutletContext } from "react-router-dom";
import PostsList from "../components/PostsList";


export default function MainFeed() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { topic, sort }
  
  return (
    <div>

    <PostsList filters={filters} />
    </div>
  );
}