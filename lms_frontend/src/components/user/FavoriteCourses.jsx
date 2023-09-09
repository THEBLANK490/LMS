import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
const FavoriteCourses = () => {
    const[courseData,setCourseData] = useState([]);
    const student_id = localStorage.getItem('student_id');

        // fetch courses when we load
        useEffect(()=>{
            document.title = "LMS | User Favorite Courses";
            try {
                axios.get(baseUrl+'/fetch-favorite-courses/'+student_id)
                .then((res) => {
                    setCourseData(res.data);
                })
            } catch (error) {
                console.log(error);
            }
        },[])


        const handleDeleteClick = (id) => {
            
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        axios.delete(baseUrl+'/student-dashboard-remove-favorite-course/'+id)
                        .then((res) =>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                              const students_id = localStorage.getItem('student_id');
                              try {
                                axios.get(baseUrl+'/fetch-favorite-courses/'+students_id)
                                .then((res) => {
                                    setCourseData(res.data);
                                })
                            } catch (error) {
                                console.log(error);
                            }
                        })
                       
                    } catch (error) {
                        console.log(error);
                        Swal.fire(
                            'Delete Failed!',
                            'Your file has not been deleted.',
                            'Failed'
                          )
                    }
                 
                }
              })
        }

    return (
        <>
        <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
            <div>
                <Sidebar/>
            </div>
            <div className="ml-2 w-11/12"> 

                <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                Favorite courses
                </h1>
                {/* Content */}
                <div class="flex flex-col ">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-center text-sm font-light">
                                    <thead
                                        class="border-b bg-neutral-800 font-medium ">
                                        <tr>
                                            <th scope="col" class=" px-6 py-4">S.N</th>
                                            <th scope="col" class=" px-6 py-4">Name</th>
                                            <th scope="col" class=" px-6 py-4">Created By:</th>
                                            <th scope="col" class=" px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {courseData.map((row,index)=> <>
                                  
                                        <tr key={index}  class="border-b dark:border-neutral-500">
                                            <td class="whitespace-nowrap  px-6 py-4 font-medium">{index+1}</td>
                                            <td class="whitespace-nowrap  px-6 py-4 text-blue-700"><Link to={`/detail/`+row.course.id}>  {row.course.title} </Link> </td>
                                            <td class="whitespace-nowrap  px-6 py-4  text-blue-700"> <Link to={`/teacher-detail/${row.course.teacher.id}`}> {row.course.teacher.full_name} </Link></td>
                                            {/* {`teacher-detail/${row.course.teacher.id}`} */}
                                            <td class="whitespace-nowrap  px-6 py-4"><button type="button" class="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 " onClick={() => handleDeleteClick(row.id)}>Delete</button></td>
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

export default FavoriteCourses