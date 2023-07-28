import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Try = () => {
  const [isOpenTeacher, setIsOpenTeacher] = useState(false);
  const teacherMenuRef = useRef(null);

  const toggleTeacherMenu = () => {
    setIsOpenTeacher(!isOpenTeacher);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (teacherMenuRef.current && !teacherMenuRef.current.contains(event.target)) {
        setIsOpenTeacher(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <li ref={teacherMenuRef}>
      <div className="relative z-10">
        <button
          onClick={toggleTeacherMenu}
          className="flex items-center   text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <span>Teacher</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 6.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpenTeacher && (
          <div className="absolute top-full left-0 w-40 bg-white border border-gray-200 shadow">
            <ul>
            <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-dashboard'>Dashboard</Link> </li>
            <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-login' >Logout</Link> </li> 
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default Try;
