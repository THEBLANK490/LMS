import React, { useEffect, useState } from "react";
import TeacherSidebar from "../teacher/TeacherSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api';
const EditCourse = () => {
    const navigate = useNavigate();
    const[cats,setCats] = useState(['']);
    const [courseData,setCourseData] = useState({
        category:'',
        title:'',
        description:'',
        prev_featured_img:'',
        featured_img:'',
        languages:'',
    });
    const {course_id}= useParams();

    // fetch the available courses to show in dropdown
    useEffect(() =>{
        document.title = "LMS | Edit Course";
        try {
            axios.get(baseUrl+'/category/')
            .then((res)=>{
                    setCats(res.data);
            })
        } catch (error) {
            console.log(error);
        } 
        //Fetch current Course Data
        try {
            axios.get(baseUrl + '/teacher-courses-detail/' + course_id)
                .then((res) => {
                    setCourseData({
                        category:res.data.category,
                        title:res.data.title,
                        description:res.data.description,
                        prev_featured_img:res.data.featured_img,
                        languages:res.data.languages,
                        featured_img:'',

                    });
                    
                })
        } catch (error) {
            console.log(error);
        }
    },[])

  
    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]:e.target.value
        })
        
    }
    const handleFileChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]:e.target.files[0]
        })
        
    }


    // submit garda server ma data pathauna lai
    const handleSubmit =  (e) => {
        e.preventDefault();
        const formDatas = new FormData();
        formDatas.append('category',courseData.category)
        formDatas.append('title',courseData.title)
        formDatas.append('teacher',1)
        formDatas.append('description',courseData.description)
        if(courseData.featured_img !== ''){
            formDatas.append('featured_img',courseData.featured_img,courseData.featured_img.name)
        }
        formDatas.append('languages',courseData.languages)
        console.log(formDatas);
        
        try {
             axios.put  (baseUrl+'/teacher-courses-detail/' + course_id,formDatas, {
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
                      navigate('/teacher-my-courses/')
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
                        Teacher Edit Course
                    </h1>

                    <form className="border-2 px-3 pb-3" method="post" onSubmit={handleSubmit}>
                        <div className="my-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={courseData.category} onChange={handleChange}> 
                                <option value="">Select a course</option>
                                {cats.map((category,index) => {return <option key={index} value={category.id}>{category.title}</option>})}
                            </select>
                            </div>
                        <div className="my-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={courseData.title}onChange={handleChange}/>
                        </div>
                        <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea  name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  value={courseData.description}  onChange={handleChange}/>
                        </div>
                        <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Featured Image</label>
                            <input type="file" name="featured_img" id='video' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"onChange={handleFileChange}/>
                            {courseData.prev_featured_img && 
                                <img src={courseData.prev_featured_img} alt="" className="h-32" />
                            }
                        </div>
                        <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Languages</label>
                            <textarea name="languages" placeholder="python, django, react,..." className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={courseData.languages} onChange={handleChange}/>
                        </div>
                        

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default EditCourse;
