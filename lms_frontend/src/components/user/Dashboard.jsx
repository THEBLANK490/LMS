import React from "react";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    return (
        <>
            <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
                {/* Left Side wala */}
                <div>
                   <Sidebar/>
                </div>
                {/* Right Side wala */}
                <div className="w-11/12">
                    User Dashboard
                </div>
            </div>
        </>
    );
};

export default Dashboard;