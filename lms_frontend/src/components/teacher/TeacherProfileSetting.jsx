import React, { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = 'http://127.0.0.1:8000/api/';
const TeacherProfileSetting = () => {
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        'full_name': "",
        'email': "",
        'password': "",
        'qualification': "",
        "mobile_no": "",
        'skills': "",
        'prev_profile_img':'',
        'profile_img':'',
        'status': "",
      });
      const [repass, setRePass] = useState({
        'confirm_password': '',
        'status': "",
      })
      const teacherId = localStorage.getItem("teacherId")

        //change element value
  const handleChange = (e) => {
    setTeacherData({
      ...teacherData, [e.target.name]: e.target.value,

    });
  };

  const handleConfirmChange = (e) => {
    setRePass({
      'confirm_password': e.target.value,
    })
  };

  const handleFileChange = (e) => {
    setTeacherData({
        ...teacherData,
        [e.target.name]:e.target.files[0]
    })
    
}

  useEffect(() =>{
    document.title = "Teacher Profile Setting";
    //Fetch current Teacher Data
    try {
        axios.get(baseUrl+'teacher/' + teacherId)
            .then((res) => {
                setTeacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    prev_profile_img:res.data.profile_img,
                    password: res.data.password,
                    profile_img:'',
                    skills:res.data.skills,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                });
                
            })
    } catch (error) {
        console.log(error);
    }
},[])

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  if (teacherLoginStatus !== 'true') {
    navigate('/teacher-login')
  }

  //onsubmit
  const submitForm = async (e) => {
    e.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name)
        teacherFormData.append('email', teacherData.email)
        teacherFormData.append('password', teacherData.password)
        teacherFormData.append('qualification', teacherData.qualification)
        teacherFormData.append('mobile_no', teacherData.mobile_no)
        teacherFormData.append('skills', teacherData.skills)
        if(teacherData.profile_img !== ''){
        teacherFormData.append('profile_img',teacherData.profile_img,teacherData.profile_img.name)
        }
        
        setRePass({ 'confirm_password': '' });
        if (teacherData.password !== repass.confirm_password) 
        {
          setRePass({
            'confirm_password': '',
            'status': 'error'
          });
          setTeacherData(
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
            await axios.put(baseUrl+'teacher/'+teacherId,teacherFormData).then((response) => {
              setTeacherData(
                {
                  'full_name': "",
                  'email': "",
                  'qualification': "",
                  "mobile_no": "",
                  'password': "",
                  'skills': "",
                  'profile_img':"",
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
            setTeacherData({ 'status': "error" })
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
                    <TeacherSidebar />
                </div>
                {/* Right Side wala */}
                <div className="ml-2 w-11/12">
                    <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                        Teacher Profile Setting
                    </h1>

          <form className="mt-6" method="post" onSubmit={submitForm}>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Full Name
              </label>
              <input
                type="text" name="full_name" value={teacherData.full_name} onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email" name="email" value={teacherData.email} onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password" name="password" value={teacherData.password} onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password" name="confirm_password" value={repass.confirm_password} onChange={handleConfirmChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Qualification
              </label>
              <input
                type="text" name="qualification" value={teacherData.qualification} onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Mobile Number
              </label>
              <input
                type="text" name="mobile_no" value={teacherData.mobile_no} onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
              />
            </div>
            <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                            <input type="file" name="profile_img" id='video' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileChange}/>
                            {teacherData.prev_profile_img && 
                                <img src={teacherData.prev_profile_img} alt="" className="h-32" />
                            }
            </div>

            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
              >
                Skills
              </label>
              <textarea name="skills" value={teacherData.skills} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
          </form>
        </div>
        </div>
        </>
    );
};

export default TeacherProfileSetting;
