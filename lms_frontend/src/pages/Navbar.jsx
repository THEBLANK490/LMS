import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isOpenTeacher, setIsOpenTeacher] = useState(false);
  const teacherMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserOpen(!isUserOpen);

  };
  
  
  const toggleTeacherMenu = () => {
    setIsOpenTeacher(!isOpenTeacher);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (teacherMenuRef.current && !teacherMenuRef.current.contains(event.target)) {
        setIsOpenTeacher(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
    };
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const teacherlogout = () => {
    localStorage.setItem('teacherLoginStatus',false)
    localStorage.removeItem('teacherId');
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Logged Out!!!',
    });
    navigate("/teacher-login"); 
    
  }
  const studentlogout = () => {
    localStorage.setItem('studentLoginStatus',false)
    localStorage.removeItem('student_id');
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Logged Out!!!',
    });
    navigate("/student-login"); 
  }

  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold">Learn Online</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to='/all-courses'>Courses</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/teachers">Teachers</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/about">About US</Link>
              </li>
            

              {/* teacher */}
              {studentLoginStatus === 'false' && <>
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
                        {teacherLoginStatus === 'false' && <>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-login'>Login</Link> </li>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-register'>Register</Link> </li>
                        </>}
                        <hr />
                        {teacherLoginStatus === 'true' && <>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-dashboard'>Dashboard</Link> </li>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/teacher-login' onClick={teacherlogout}>Logout</Link> </li>                      
                        </>}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              </>
              }

              {/* user */}
              {teacherLoginStatus === 'false' && <>
              <li ref={userMenuRef}>
                <div className="relative z-10">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center   text-gray-600 hover:text-blue-600 focus:outline-none"
                  >
                    <span>User</span>
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

                  {isUserOpen && (
                    <div className="absolute top-full left-0 w-40 bg-white border border-gray-200 shadow">
                      <ul>
                      {studentLoginStatus === 'false' && <>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/user-login'>Login</Link> </li>
                        <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/user-register'>Register</Link> </li>
                        <hr />
                        </>}
                        {studentLoginStatus === 'true' && <>
                          <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/user-dashboard'>Dashboard</Link> </li>
                          <li className="px-4 py-2 hover:bg-gray-100"> <Link to='/user-login' onClick={studentlogout}>Logout</Link> </li>
                        </>}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
