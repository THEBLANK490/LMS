import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const TeacherSidebar = () => {
    const navigate = useNavigate();
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
      
  return (
    <>
     <table className="min-w-full divide-y divide-gray-200 ">
                        {/* <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Dashboard
                                </th>
                            </tr>
                        </thead> */}
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/teacher-dashboard'>Dashboard</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/teacher-my-courses'>My Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/add-courses'>Add Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/my-users'>My Users</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/teacher-profile-setting'>Profile Setting</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-red-800 font-semibold whitespace-nowrap flex justify-between">
                                    <Link to='/teacher-login' onClick={teacherlogout}>Logout</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    </>
  )
}

export default TeacherSidebar