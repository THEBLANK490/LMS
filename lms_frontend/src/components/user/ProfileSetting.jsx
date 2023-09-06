import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api/';
const ProfileSetting = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        'full_name': "",
        'email': "",
        'password': "",
        'username':"",
        'interested_categories':"",
        'prev_profile_img':'',
        'student_profile_img':'',
        'status': "",
      });
    const student_id = localStorage.getItem("student_id");
    const [repass, setRePass] = useState({
        'confirm_password': '',
        'status': "",
      })

    const handleChange = (e) => {
        setStudentData({
          ...studentData, [e.target.name]: e.target.value,
    
        });
    };

    const handleConfirmChange = (e) => {
        setRePass({
          'confirm_password': e.target.value,
        })
      };
    
      const handleFileChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]:e.target.files[0]
        })
        
    }

    useEffect(() =>{
        document.title = "User Profile Setting";
        //Fetch current Student Data
        try {
            axios.get(baseUrl+'student/' + student_id)
                .then((res) => {
                    setStudentData({
                        full_name:res.data.full_name,
                        username:res.data.username,
                        email:res.data.email,
                        prev_profile_img:res.data.student_profile_img,
                        password: res.data.password,
                        student_profile_img:'',
                        interested_categories:res.data.interested_categories,
                    });
                    
                })
        } catch (error) {
            console.log(error);
        }
    },[])

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus !== 'true') {
      navigate('/user-login')
    }

    const submitForm = async (e) => {
        e.preventDefault();
            const studentFormData = new FormData();
            studentFormData.append('full_name', studentData.full_name)
            studentFormData.append('username', studentData.username)
            studentFormData.append('email', studentData.email)
            studentFormData.append('password', studentData.password)
            studentFormData.append('interested_categories',studentData.interested_categories)
            
            if(studentData.profile_img !== ''){
                studentFormData.append('student_profile_img',studentData.profile_img,studentData.profile_img.name)
            }
            
            setRePass({ 'confirm_password': '' });
            if (studentData.password !== repass.confirm_password) 
            {
              setRePass({
                'confirm_password': '',
                'status': 'error'
              });
              setStudentData(
                {
                  'password': "",
                });
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Password and Confirm Password Donot Match',
              });
              return;
            } else {
             try {
                await axios.put(baseUrl+'student/'+student_id,studentFormData).then((response) => {
                    setStudentData(
                    {
                      'full_name': "",
                      'username':"",
                      'email': "",
                      'interested_categories':"",
                      'password': "",
                      'skills': "",
                      'student_profile_img':"",
                      'prev_profile_img':"",
                      'status': "success",
                    });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Update successful!',
                    });
    
                })
              } catch (error) {
                console.log(error);
                setStudentData({ 'status': "error" })
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Failed to update. Please try again later.',
                });
              }
            }
        }

    return (
        <>
            <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
                {/* Left Side wala */}
                <div>
                    <Sidebar />
                </div>
                {/* Right Side wala */}
                <div className="ml-2 w-11/12">
                    <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                        User Profile Setting
                    </h1>

                    <form className="border-2 px-3 pb-3" onSubmit={submitForm}>
                    <div className="my-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="name" name="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={studentData.full_name} onChange={handleChange}/>
                        </div>

                    <div className="my-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                            <input type="name" name="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={studentData.username} onChange={handleChange}/>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email"  name="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={studentData.email} onChange={handleChange} />
                        </div>

                        <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                            <input type="file" name="profile_img" id='video' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileChange}/>
                            {studentData.prev_profile_img && 
                                <img src={studentData.prev_profile_img} alt="" className="h-32" />
                            }
            </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={studentData.password} onChange={handleChange} />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" name="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="confirm_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={repass.confirm_password} onChange={handleConfirmChange} />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="interest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interest</label>
                            <input type="text" id="interest" name="interested_categories" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  value={studentData.interested_categories} onChange={handleChange}/>
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default ProfileSetting;
