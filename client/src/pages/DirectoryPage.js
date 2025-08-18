import { useOutletContext } from "react-router-dom";
import ProfilesList from "../components/ProfilesList";


export default function DirectoryPage() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { name, indsutry, location }
  
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Members Directory</h1>
    <ProfilesList filters={filters} />
  </div>
  );
}