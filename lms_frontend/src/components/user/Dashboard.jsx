import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = 'http://127.0.0.1:8000/api/';
const Dashboard = () => {
    const student_id = localStorage.getItem("student_id");
    const [dashboardData, setDashboardData] = useState([]);
    const [studentData, setStudentData] = useState({
        'full_name': "",
        'username':"",
        'email': "",
        'password': "",
        'interested_categories':"",
        'prev_profile_img':'',
        'student_profile_img':'',
        'status': "",
      });

      useEffect(() => {
        document.title = " User Dashboard";
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
    
        try {
          axios.get(baseUrl + "student/dashboard/" + student_id).then((res) => {
            setDashboardData(res.data);
          });
        } catch (error) {
          console.log(error);
        }
      }, []);
    return (
        <>
            <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
                {/* Left Side wala */}
                <div>
                   <Sidebar/>
                </div>
                {/* Right Side wala */}
                <div className="w-11/12 text-center justify-between font-serif mb-16">
          <h1 className=" text-6xl text-orange-600 mb-12">User Dashboard</h1>
          <div class="flex w-full ml-8 mb-8">
            <div class="flex-1 m-5 relative rounded bg-gray-200 shadow">
              <div class="bg-green-500 pl-10 pr-10 pt-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow">
                <i class="fas fa-envelope inline-block w-5"></i>
              </div>
              <Link to='/my-courses'>
              <div class="float-right top-0 right-0 m-3 ">
                <div class="text-right text-sm hover:text-blue-700">Total My Courses</div>
                <div class="text-right text-3xl hover:text-blue-700">{dashboardData.total_my_courses}</div>
              </div>
              </Link>
            </div>

            <div class="flex-1 m-5 relative rounded bg-gray-200 shadow">
              <div class="bg-blue-500 pl-10 pr-10 pt-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow">
                <i class="fas fa-envelope inline-block w-5"></i>
              </div>

            <Link to='/favorite-courses'>
              <div class="float-right top-0 right-0 m-3">
                <div class="text-right text-sm hover:text-blue-700">Total Favorite Chapters</div>
                <div class="text-right text-3xl hover:text-blue-700">{dashboardData.total_favorite_chapters}</div>
              </div>
            </Link>
            </div>
          </div>

          <div className="flex text-center justify-start">
            <div className="ml-32 ">
              <img
                src={studentData.prev_profile_img}
                alt={studentData.full_name}
                className="h-80 w-80 image-fit image-cover"
              />
            </div>

            <div className="ml-32 mt-16 text-lg leading-8 text-left">
              <p className="m-2">
                <span className="font-bold ">Full Name: </span>
                {studentData.full_name}
              </p>
              <p className="m-2">
                <span className="font-bold ">Email: </span> {studentData.email}
              </p>
              <p className="m-2">
                <span className="font-bold ">Username: </span> {studentData.username}
              </p>
              <p className="m-2">
                <span className="font-bold ">Interest: </span> {studentData.interested_categories}
              </p>
            </div>
          </div>
        </div>
            </div>
            
        </>
    );
};

export default Dashboard;