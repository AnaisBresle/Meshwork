import { useOutletContext } from "react-router-dom";
import ProfilesList from "../components/ProfilesList";


export default function DirectoryPage() {
  // filters provided by <Outlet context={{ filters }} />
  const { filters } = useOutletContext(); // { name, indsutry, location }
  
  return (
    <div>
     <h1 style={{ margin: 0 }}>Members Directory </h1>

      
    <ProfilesList filters={filters} />
    </div>
   
  );

}