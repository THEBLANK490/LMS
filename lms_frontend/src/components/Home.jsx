import React, { useEffect, useState } from "react";
import Carousels from "../pages/Carousels";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Sliders from "../pages/Sliders";
import PopularCards from "../pages/PopularCards";
import TeacherCards from "../pages/TeacherCards";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const Home = () => {
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  // fetch courses when we load
  useEffect(() => {
    document.title = "LMS | Home";
    try {
      // axios.get(baseUrl + "/course/?result=4").then((res) => {
      axios.get(baseUrl + "/course-get/?result=4").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      // axios.get(baseUrl + "/course/?result=4").then((res) => {
      axios.get(baseUrl + "/teacher-get/?result=4").then((res) => {
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

  }, []);

  return (
    <>
      <Carousels />
      {/* latest course */}
      <div className="flex justify-between mx-8 mt-8">
        <h2 className="text-2xl font-bold ml-16">Latest Courses</h2>
        <Link to="/all-courses"> See More</Link>
      </div>
      <div className=" overflow-x-hidden ">
        <div className="m-auto flex flex-row justify-center items-center">
        {courseData && courseData.map((course,index)=>(
            <Card className="mt-12 w-72 ml-8 min-w-min" key={index}>
            <CardHeader color="blue-gray" className="relative h-56">
              <Link to={"/detail/"+course.id}>
                <img
                  src={course.featured_img}
                  alt={course.title}
                  className='h-full w-full'
                  
                />
              </Link>
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {course.title}
              </Typography>
              <Typography>{course.description}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>
                <Link to={"/detail/"+course.id}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
          ))}
        </div>
      </div>

      {/* Teacher */}
      <div className="flex justify-between mx-8 mt-8">
        <h2 className="text-2xl font-bold ml-16">Teachers</h2>
        <Link to="/teachers"> See More</Link>
      </div>
      <div className=" overflow-x-hidden ">
        <div className="m-auto flex flex-row justify-center items-center">
        {teacherData && teacherData.map((teacher,index)=>(
            <Card className="mt-12 w-72 ml-8 min-w-min" key={index}>
            <CardHeader color="blue-gray" className="relative h-56">
              <Link to={"/teacher-detail/"+teacher.id}>
                <img
                  src={teacher.profile_img}
                  alt={teacher.full_name}
                  className='h-full w-full'
                  
                />
              </Link>
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {teacher.full_name}
              </Typography>
              <Typography>{teacher.qualification}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>
                <Link to={"/teacher-detail/"+teacher.id}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
          ))}
        </div>

      </div>

      {/* Student Testomonial */}
      <h2 className="font-2xl font-bold ml-16 mt-16">Student Testimonial</h2>
      <Sliders />
    </>
  );
};

export default Home;
