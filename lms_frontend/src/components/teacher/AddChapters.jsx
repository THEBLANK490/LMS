import React, { useEffect, useState } from "react";
import TeacherSidebar from "../teacher/TeacherSidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl='http://127.0.0.1:8000/api';
const AddChapters = () => {
    const [chapterData,setChapterData] = useState({
        title:'',
        description:'',
        video:'',
        remarks:'',
    })
    useEffect(()=>{
        document.title = "LMS | Add Chapters";
    })

    // fetch the available courses to show in dropdown
  
    const handleChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.value
        })
        
    }
    const handleFileChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.files[0]
        })
        
    }

    const {course_id} = useParams();

    // submit garda server ma data pathauna lai
    const handleSubmit =  (e) => {
        e.preventDefault();
        const formDatas = new FormData();
        formDatas.append('course',course_id)
        formDatas.append('title',chapterData.title)
        formDatas.append('description',chapterData.description)
        formDatas.append('video',chapterData.video,chapterData.video.name)
        formDatas.append('remarks',chapterData.remarks)
        console.log(formDatas);
        
        try {
             axios.post(baseUrl+'/chapter/',formDatas, {
                headers: {
                  'content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                console.log(res.status);
                if(res.status === 200 || res.status === 201){
                    Swal.fire({
                        title: 'Data has been added',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton:false,
                      })
                      window.location.href='/add-chapters/'+course_id;
                     }
            })
        } catch (error) {
            Swal.fire({
                title: 'Data addition Failed',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton:false,
              })
        }
    }

    return (
        <>
            <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
                {/* Left Side wala */}
                <div>
                    <TeacherSidebar />
                </div>
                {/* Right Side wala */}
                <div className="ml-2 w-11/12">
                    <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                        Add Chapters
                    </h1>

                    <form className="border-2 px-3 pb-3" onSubmit={handleSubmit}>
                    <div className="my-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={handleChange} required/>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea  name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={handleChange} required />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video</label>
                            <input type="file" name="video" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileChange} required/>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                            <textarea name="remarks" placeholder="Information about the course chapter." className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "onChange={handleChange} required/>
                        </div>
                        

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default AddChapters;
