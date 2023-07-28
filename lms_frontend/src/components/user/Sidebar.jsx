import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
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
                                    <Link to='/favorite-courses'>Favourite Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/recommended-courses'>Recommended Courses</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/profile-setting'>Profile Setting</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-between">
                                    <Link to='/change-password'>Change Password</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-red-800 font-semibold whitespace-nowrap flex justify-between">
                                    <Link to='/user-login'>Logout</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    </>
  )
}

export default Sidebar