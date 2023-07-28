import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api'; 
const TeacherMyCourses = () => {
    const[courseData,setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    const Swal = require('sweetalert2')
    

    
    // fetch courses when we load
    useEffect(()=>{
        try {
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
            .then((res) => {
                setCourseData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    },[])
    // const course_id = courseData.length > 0 ? courseData[0].id : null;
    // console.log(course_id);
    // console.log(typeof(course_id));

    // const handleDeleteClick = (chapter_id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 axios.delete(baseUrl+'/course/'+course_id)
    //                 .then((res) =>{
    //                     Swal.fire(
    //                         'Deleted!',
    //                         'Your file has been deleted.',
    //                         'success'
    //                       )
    //                       console.log("1");
    //                     try {
    //                         axios.get(baseUrl+'/course/'+course_id+'/')
    //                         .then((res) => {
    //                             setCourseData(res.data);
    //                         })
    //                     } catch (error) {
    //                         console.log(error);
    //                         console.log("bhitra ko catch ");
    //                     }
    //                 })
                   
    //             } catch (error) {
    //                 console.log("last ko catch ");
    //                 console.log(error);
    //                 Swal.fire(
    //                     'Delete Failed!',
    //                     'Your file has not been deleted.',
    //                     'Failed'
    //                   )
    //             }
             
    //         }
    //       })
    // }

    return (
        <>
        <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
            <div>
                <TeacherSidebar/>
            </div>
            <div className="ml-2 w-11/12"> 

                <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                    My courses
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
                                            <th scope="col" className=" px-6 py-4">Image</th>
                                            <th scope="col" className=" px-6 py-4">Total Enrolled:</th>
                                            <th scope="col" className=" px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course,index)=>
                                             <>
                                                <tr key={index} className="border-b dark:border-neutral-500">
                                                    <td key={index} className="whitespace-nowrap  px-6 py-4 text-blue-700"> <Link to={'/all-chapters/'+ course.id}>{course.title}</Link></td>
                                                    <td  className="whitespace-nowrap  px-6 py-4 flex items-center justify-center"><img src={course.featured_img} width="80" height="100" className='rounded' alt={course.title} /></td>
                                                    <td  className="whitespace-nowrap  px-6 py-4"> <Link to='#'> {course.total_enrolled_student} </Link></td>
                                                    <td  className="whitespace-nowrap  px-6 py-4"><Link to={'/add-chapters/'+course.id}><button type="button" className="focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 ">Add Chapter </button></Link></td>
                                                    <td  className="whitespace-nowrap  px-6 py-4"><Link to={'/edit-courses/'+course.id}><button type="button" className="focus:outline-none text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 ">Edit </button></Link></td>
                                                    <td  className="whitespace-nowrap  px-6 py-4"><button type="button" className="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Delete</button></td>
                                                </tr> 
                                            </>
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

export default TeacherMyCourses