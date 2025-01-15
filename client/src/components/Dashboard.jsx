import Navbar from "./Navbar.jsx";
import AddResume from "./AddResume.jsx";
import { Outlet, useLocation } from "react-router-dom";

function Dashboard() {
    const location = useLocation();

    return (
        <div>
            <Navbar />
            {location.pathname === "/dashboard" && <AddResume />}
            <Outlet />
        </div>
    );
}

export default Dashboard;
