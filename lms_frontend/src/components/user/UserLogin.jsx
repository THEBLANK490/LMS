import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = 'http://127.0.0.1:8000/api';
const Login = () => {
    const navigate = useNavigate();
    const [studentLoginData,setStudentLoginData]=useState({
        'email':'',
        'password':'',
    })
    const [errorMsg,setErrorMsg]=useState('');
    const [showLogin,setShowLogin] =useState('false');

    useEffect(()=>{
        document.title = 'User Login';
        const studentLoginStatus = localStorage.getItem('studentLoginStatus')
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
        if(teacherLoginStatus === 'true'){
            setShowLogin('true')
        }
        if(studentLoginStatus === 'true'){
            navigate('/');
        }
    },[])

    const handleChange = (e) => {
        e.preventDefault();
        setStudentLoginData({
            ...studentLoginData,[e.target.name]:e.target.value

        })
    }

    const handleSubmit = async () => {
        if(showLogin==='false'){
        const studentFormData = new FormData();
        studentFormData.append('email', studentLoginData.email);
        studentFormData.append('password',studentLoginData.password);
        try {
            await axios.post(baseUrl+'/student-login/',studentFormData)
            .then((res)=>{
                if(res.data.bool === true)
                {
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('student_id',res.data.student_id);
                    console.log(typeof(res.data.student_id));
                    navigate('/user-dashboard');
                } else {
                    setErrorMsg('Invalid Email or password');
                }
            })
        } catch (error) {
            console.log(error);
        } 
    }
    }
    return (
        <>
        
           <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                        <h3 className="text-4xl font-bold text-purple-600">UserLogin</h3>
                </div>
                    <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                        {showLogin === 'true' && <p className="text-red-700 text-center mb-2">Cannot Login as Teacher and User at same time</p>}
                        {errorMsg && <p className="text-red-700 text-center ">{errorMsg}</p>}
                    {/* <form className="mt-6" method="post" onSubmit={handleSubmit}> */}
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email" name="email" value={studentLoginData.email} onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password" name="password" value={studentLoginData.password} onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    {/* </form> */}

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <Link
                            to="/user-register"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
