import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api/";
const TeacherDashboard = () => {
  const teacherId = localStorage.getItem("teacherId");
  const [dashboardData, setDashboardData] = useState([]);
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    prev_profile_img: "",
    profile_img: "",
    status: "",
  });

  useEffect(() => {
    document.title = " Teacher Dashboard";
    //Fetch current Teacher Data
    try {
      axios.get(baseUrl + "teacher/" + teacherId).then((res) => {
        setTeacherData({
          full_name: res.data.full_name,
          email: res.data.email,
          prev_profile_img: res.data.profile_img,
          profile_img: "",
          skills: res.data.skills,
          qualification: res.data.qualification,
          mobile_no: res.data.mobile_no,
        });
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + "teacher/dashboard/" + teacherId).then((res) => {
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
          <TeacherSidebar />
        </div>
        {/* Right Side wala */}

        <div className="w-11/12 text-center justify-between font-serif mb-16">
          <h1 className=" text-6xl text-orange-600 mb-12">Dashboard</h1>
          <div className="flex w-full ml-8 mb-8">
            <div className="flex-1 m-5 relative rounded bg-gray-200 shadow">
              <div className="bg-green-500 pl-10 pr-10 pt-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow">
                <i className="fas fa-envelope inline-block w-5"></i>
              </div>
              <Link to='/teacher-my-courses'>
              <div className="float-right top-0 right-0 m-3 ">
                <div className="text-right text-sm hover:text-blue-700">Total Courses</div>
                <div className="text-right text-3xl hover:text-blue-700">{dashboardData.total_teacher_courses}</div>
              </div>
              </Link>
            </div>

            <div className="flex-1 m-5 relative rounded bg-gray-200 shadow">
              <div className="bg-blue-500 pl-10 pr-10 pt-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow">
                <i className="fas fa-envelope inline-block w-5"></i>
              </div>

            <Link to='/teacher-my-courses'>
              <div className="float-right top-0 right-0 m-3">
                <div className="text-right text-sm hover:text-blue-700">Total Chapters</div>
                <div className="text-right text-3xl hover:text-blue-700">{dashboardData.total_teacher_chapters}</div>
              </div>
            </Link>
            </div>


            <div className="flex-1 m-5 relative rounded bg-gray-200 shadow">
              <div className="bg-red-500 pl-10 pr-10 pt-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow">
                <i className="fas fa-envelope inline-block w-5"></i>
              </div>

              <Link to='/my-users'>
              <div className="float-right top-0 right-0 m-3">
                <div className="text-right text-sm hover:text-blue-700">Total Student</div>
                <div className="text-right text-3xl hover:text-blue-700">{dashboardData.total_teacher_students}</div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex text-center justify-start">
            <div className="ml-32 ">
              <img
                src={teacherData.prev_profile_img}
                alt={teacherData.full_name}
                className="h-80 w-80 image-fit image-cover"
              />
            </div>

            <div className="ml-32 mt-16 text-lg leading-8 text-left">
              <p>
                <span className="font-bold ">Full Name: </span>{" "}
                {teacherData.full_name}{" "}
              </p>
              <p>
                <span className="font-bold ">Email: </span> {teacherData.email}{" "}
              </p>
              <p>
                <span className="font-bold ">Qualification: </span>{" "}
                {teacherData.qualification}{" "}
              </p>
              <p>
                <span className="font-bold "> Mobile Number:</span>{" "}
                {teacherData.mobile_no}{" "}
              </p>
              <p>
                <span className="font-bold ">Skills: </span>{" "}
                {teacherData.skills}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
