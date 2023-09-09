import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api'; 
const MyUsers = () => {
    const[studentData,setStudentData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    // fetch students and courses where they have registered when we load
    useEffect(()=>{
        document.title = "LMS | My Users";
        try {
            axios.get(baseUrl+'/fetch-all-enroll-students/'+teacherId)
            .then((res) => {
                setStudentData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <>
        <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
            <div>
                <TeacherSidebar/>
            </div>
            <div className="ml-2 w-11/12"> 

                <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                    All Student List
                </h1>
                {/* Content */}
                <div className="flex flex-col ">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <thead
                                        className="border-b bg-neutral-800 font-medium ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-4">Name</th>
                                            <th scope="col" className=" px-6 py-4">Email</th>
                                            <th scope="col" className=" px-6 py-4">UserName</th>
                                            <th scope="col" className=" px-6 py-4">Enrolled Course</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((row,index)=>
                                                <tr key={index} className="border-b dark:border-neutral-500">
                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                         {row.student.full_name}
                                                    </td>

                                                    <td  className="whitespace-nowrap  px-6 py-4 flex items-center justify-center">
                                                        {row.student.email}
                                                    </td>

                                                    <td  className="whitespace-nowrap  px-6 py-4"> 
                                                        {row.student.username}
                                                    </td>

                                                    <td  className="whitespace-nowrap  px-6 py-4"> 
                                                        {row.course.title}
                                                    </td>
                                                </tr> 
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default MyUsers