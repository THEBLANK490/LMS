import React, { useEffect, useState } from 'react';
import Pic from "../assets/images/digital_camera_photo-1080x675.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const TeacherDetail = () => {
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  let { teacher_id } = useParams();

  // fetch courses when we load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/teacher/' + teacher_id)
        .then((res) => {
          setTeacherData(res.data);
          setCourseData(res.data.teacher_courses);
        })
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <div className="container ml-10">
      <div className=" flex p-7 justify-left ml-32">
        <img src={teacherData.profile_img} alt={teacherData.full_name} className="h-80 w-96" />
        <div className="mx-5 leading-8">
          <h1 className="text-2xl mb-3 font-bold  text-green-500">{teacherData.full_name}</h1>
          <p className="font-bold mt-8">
          </p>

          <p><span className="font-bold ">Email: </span> {teacherData.email} </p>
          <p><span className="font-bold ">Qualification: </span> {teacherData.qualification} </p>
          <p><span className="font-bold "> Mobile Number:</span> {teacherData.mobile_no} </p>
          <p><span className="font-bold ">Skills: </span> {teacherData.skills} </p>
        </div>
      </div>

      {/* table part */}

      <div className="flex flex-col ml-36">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Courses Video
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courseData.map((course, index) =>
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-blue-800 whitespace-nowrap flex justify-between">
                        <Link to={`/detail/${course.id}`}>{course.title}</Link>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TeacherDetail