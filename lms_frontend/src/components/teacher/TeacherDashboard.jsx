import React from "react";
import TeacherSidebar from "./TeacherSidebar";


const TeacherDashboard = () => {
    return (
        <>
            <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
                {/* Left Side wala */}
                <div>
                   <TeacherSidebar/>
                </div>
                {/* Right Side wala */}
                <div className="w-11/12">
                    Dashboard
                </div>
            </div>
        </>
    );
};

export default TeacherDashboard;
