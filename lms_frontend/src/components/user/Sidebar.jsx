import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate();
    const userlogout = () => {
        localStorage.setItem('studentLoginStatus',false)
        localStorage.removeItem('student_id');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Logged Out!!!',
        });
        navigate("/user-login"); 
        
      }
      
  return (
    <>
     <table className="min-w-full divide-y divide-gray-200 ">

                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/user-dashboard'>Dashboard</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/my-courses'>My Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/favorite-courses'>Favorite Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/profile-setting'>Profile Setting</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-red-800 font-semibold whitespace-nowrap flex justify-between" onClick={userlogout}>
                                    <Link to='/user-login'>Logout</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    </>
  )
}

export default Sidebar