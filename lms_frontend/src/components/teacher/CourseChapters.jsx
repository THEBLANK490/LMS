import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api'; 
const CourseChapters = () => {
    const[chapterData,setChapterData] = useState([]);
    const[totalResult,setTotalResult] = useState(0);
    const {course_id} = useParams();
    const Swal = require('sweetalert2')

    
    // fetch courses when we load
    useEffect(()=>{
        try {
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res) => {
                setTotalResult(res.data.length);
                setChapterData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    },[])

    const handleDeleteClick = (chapter_id) => {
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
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res) =>{
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                        try {
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res) => {
                                setTotalResult(res.data.length);
                                setChapterData(res.data);
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
                <TeacherSidebar/>
            </div>
            <div className="ml-2 w-11/12"> 

                <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                    All Chapters ({totalResult}) <Link to={'/add-chapters/'+course_id} className="focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 ">Add Chapter</Link>
                </h1>
                {/* Content */}
                <div className="flex flex-col ">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 ">
                            <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light">
                                    <thead
                                        className="border-b bg-neutral-800 font-medium ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-4">Title</th>
                                            <th scope="col" className=" px-6 py-4">Description</th>
                                            <th scope="col" className=" px-6 py-4">Video</th>
                                            <th scope="col" className=" px-6 py-4">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chapterData.map((chapter,index)=>{
                                            return <>
                                                <tr key={chapter.id} className="border-b dark:border-neutral-500">
                                                    <td  className="whitespace-nowrap  px-6 py-4 text-blue-700"><Link to={"/edit-chapters/"+chapter.id} >{chapter.title}</Link></td>

                                                    <td  className="whitespace-nowrap  px-6 py-4 ">{chapter.description}</td>

                                                    <td  className="whitespace-nowrap  px-6 py-4"> 
                                                    {chapter.video && 
                                                    <video controls width="250" className='h-32' autoplay>
                                                        <source src={chapter.video} type="video/webm"/>
                                                        <source src={chapter.video} type="video/mp4"/>
                                                        Sorry,Your Browser Doesn't Support embed Videos.
                                                        </video>
                                                    }
                                                    </td>

                                                    <td  className="whitespace-nowrap py-4"><Link to={"/edit-chapters/"+chapter.id} type="button" className="focus:outline-none text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 ">Edit</Link></td>

                                                    <td  className="whitespace-nowrap py-4"><button type="button" className="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 " onClick={() => handleDeleteClick(chapter.id)}>Delete</button></td>
                                                </tr> 
                                            </>
                                        })}

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

export default CourseChapters