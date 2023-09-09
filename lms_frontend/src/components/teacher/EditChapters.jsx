import React, { useEffect, useState } from "react";
import TeacherSidebar from "../teacher/TeacherSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = 'http://127.0.0.1:8000/api';
const EditChapters = () => {
    const [chapterData, setChapterData] = useState({
        course:'',
        title: '',
        description: '',
        prev_video:'',
        video: '',
        remarks: '',
        material: '',
    })
    const { chapter_id } = useParams();
    const navigate = useNavigate();
    const Swal = require('sweetalert2');
    const course_id =chapterData.course

    // fetch the available courses to show in dropdown

    const handleChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]: e.target.value
        })

    }
    const handleFileChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]: e.target.files[0]
        })

    }

    useEffect(() => {
        document.title = "LMS | Edit Chapters";
        try {
            axios.get(baseUrl + '/chapter/' + chapter_id)
                .then((res) => {
                    setChapterData({
                        course: res.data.course,
                        title:res.data.title,
                        description:res.data.description,
                        prev_video:res.data.video,
                        remarks:res.data.remarks,
                        video:''
                    });
                    
                })
        } catch (error) {
            console.log(error);
        }
    }, [])



    // submit garda server ma data pathauna lai
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDatas = new FormData();
        formDatas.append('course', chapterData.course)
        formDatas.append('title', chapterData.title)
        formDatas.append('description', chapterData.description)
        formDatas.append('material',chapterData.material)
        if(chapterData.video !== ''){
            formDatas.append('video', chapterData.video, chapterData.video.name)
        }
        formDatas.append('remarks', chapterData.remarks)
        // console.log(formDatas);

        try {
            axios.put(baseUrl + '/chapter/'+chapter_id, formDatas, {
                headers: {
                    'content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if(res.status==200){
                        Swal.fire({
                            title: 'Data has been updated',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton:false,
                          }) 
                          navigate('/all-chapters/'+course_id)
                }
            })
        } catch (error) {
            console.log(error);
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
                        Update Chapters
                    </h1>

                    <form className="border-2 px-3 pb-3">
                        <div className="my-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={chapterData.title} onChange={handleChange} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={chapterData.description} onChange={handleChange} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materials</label>
                        <input type="file" name="material" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileChange} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video</label>
                            <input type="file" name="video" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileChange} />
                            {chapterData.prev_video && 
                            <video controls width="100%" className="h-96">
                                <source src={chapterData.prev_video} type="video/webm" />
                                <source src={chapterData.prev_video} type="video/mp4" />
                                Sorry,Your Browser Doesn't Support embed Videos.
                            </video>
                            }
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                            <textarea name="remarks" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={chapterData.remarks} onChange={handleChange} />
                        </div>


                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Submit</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default EditChapters;