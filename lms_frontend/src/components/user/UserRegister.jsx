import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api/student_register/";
const Register = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        password: "",
        username: "",
        interested_categories: "",
        status: "",
    });
    const [repass, setRePass] = useState({
        confirm_password: "",
        status: "",
    });

    useEffect(() => {
        document.title = "User Register";
        const studentLoginStatus = localStorage.getItem("studentLoginStatus");
        if (studentLoginStatus === "true") {
            console.log(studentLoginStatus);
            navigate("/");
        }
    }, []);

    //change element value
    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });

    };
    const handleConfirmChange = (e) => {
        setRePass({
            confirm_password: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            // Check if email is already registered
            const response = await axios.get(baseUrl + `validate/?email=${encodeURIComponent(studentData.email)}`);
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
                const studentFormData = new FormData();
                studentFormData.append("full_name", studentData.full_name);
                studentFormData.append("email", studentData.email);
                studentFormData.append("password", studentData.password);
                studentFormData.append("username", studentData.username);
                studentFormData.append("interested_categories", studentData.interested_categories);

                setRePass({ confirm_password: "" });
                if (studentData.password !== repass.confirm_password) {
                    setRePass({
                        confirm_password: "",
                        status: "error",
                    });
                    setStudentData({
                        full_name: "",
                        email: "",
                        password: "",
                        username: "",
                        interested_categories: "",
                    });
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Password and Confirm Password Donot Match',
                      });
                    return;
                } else {
                    try {
                        await axios.post(baseUrl, studentFormData).then((response) => {
                            setStudentData({
                                full_name: "",
                                email: "",
                                password: "",
                                username: "",
                                interested_categories: "",
                                status: "success",
                            });
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Registration successful!',
                              });
                        });
                    } catch (error) {
                        console.log(error);
                        setStudentData({ status: "error" });
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
            setStudentData({ status: "error" });
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
              });
        }
    };


    return (
        <>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">User Register</h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form className="mt-6" method="post" onSubmit={submitForm}>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={studentData.full_name}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                UserName
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={studentData.username}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={studentData.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={studentData.password}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={repass.confirm_password}
                                onChange={handleConfirmChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Interest
                            </label>
                            <textarea
                                name="interested_categories"
                                value={studentData.interested_categories}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="my-4 ml-2 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link
                                to="/user-login"
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

export default Register;
