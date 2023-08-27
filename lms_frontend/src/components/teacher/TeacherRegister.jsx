import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';
const TeacherRegister = () => {
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

  useEffect(() => {
    document.title = "Teacher Register";
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus === 'true') {
      console.log(teacherLoginStatus);
      navigate('/teacher-dashboard')
    }
  }, []);

  //change element value
  const handleChange = (e) => {
    setTeacherData({
      ...teacherData, [e.target.name]: e.target.value,

    });
  };
  const handleFileChange = (e) => {
    setTeacherData({
        ...teacherData,
        [e.target.name]:e.target.files[0]
    })
    
}
  const handleConfirmChange = (e) => {
    setRePass({
      'confirm_password': e.target.value,
    })
  };

  //onsubmit
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Check if email is already registered
      const response = await axios.get(baseUrl + `validate/?email=${encodeURIComponent(teacherData.email)}`);
      const data = response.data;
      if (data.exists) {
        // Email exists, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User already exists with this email.',
        });
        return;
      } else {
        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name)
        teacherFormData.append('email', teacherData.email)
        teacherFormData.append('password', teacherData.password)
        teacherFormData.append('qualification', teacherData.qualification)
        teacherFormData.append('mobile_no', teacherData.mobile_no)
        teacherFormData.append('skills', teacherData.skills)
        teacherFormData.append('profile_img',teacherData.profile_img,teacherData.profile_img.name)

        setRePass({ 'confirm_password': '' });
        if (teacherData.password !== repass.confirm_password) 
        {
          setRePass({
            'confirm_password': '',
            'status': 'error'
          });
          setTeacherData(
            {
              'full_name': "",
              'email': "",
              'password': "",
              'qualification': "",
              "mobile_no": "",
              'skills': "",
              'profile_img':"",
              'prev_profile_img':"",
            }
          );
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Password and Confirm Password Donot Match',
          });
          return;
        } else {
          try {
            await axios.post(baseUrl,teacherFormData).then((response) => {
              setTeacherData(
                {
                  'full_name': "",
                  'email': "",
                  'password': "",
                  'qualification': "",
                  "mobile_no": "",
                  'skills': "",
                  'status': "success",
                });
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'Registration successful!',
                });

            })
          } catch (error) {
            console.log(error);
            setTeacherData({ 'status': "error" })
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to register. Please try again later.',
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });

    }
  }



  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>

          <h3 className="text-4xl font-bold text-purple-600">
            Teacher Register
          </h3>

        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
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
                            <input type="file" name="profile_img" id='video' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"onChange={handleFileChange}/>
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
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" >
                Register
              </button>
            </div>
          </form>

          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link
                to="/teacher-login"
                className="text-purple-600 hover:underline"
                href="#"
              >
                Log in
              </Link>
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default TeacherRegister;
