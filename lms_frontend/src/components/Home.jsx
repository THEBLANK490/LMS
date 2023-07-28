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

  // fetch courses when we load
  useEffect(() => {
    document.title = "LMS | Home";
    try {
      axios.get(baseUrl + "/course/?result=4").then((res) => {
        console.log(res.data);
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Array of card data
  // const cardData = [
  //   { title: "Card 1", content: "Lorem ipsum dolor sit amet." },
  //   { title: "Card 2", content: "Consectetur adipiscing elit." },
  //   { title: "Card 3", content: "Sed do eiusmod tempor incididunt." },
  //   { title: "Card 3", content: "Sed do eiusmod tempor incididunt." },
  // ];
  const popularCourse = [
    { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
    { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
    { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
    { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
  ];
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

      {/* Popular Courses */}
      <div className="flex justify-between mx-8 mt-8">
        <h2 className="text-2xl font-bold ml-16">Popular Courses</h2>
        <Link to="/popular-courses"> See More</Link>
      </div>
      <div className=" overflow-x-hidden ">
        <div className="m-auto flex flex-row justify-center items-center">
          {popularCourse.map((card, index) => (
            <PopularCards
              key={index}
              title={card.title}
              content={card.content}
            />
          ))}
        </div>
      </div>

      {/* Teacher */}
      <div className="flex justify-between mx-8 mt-8">
        <h2 className="text-2xl font-bold ml-16">Teachers</h2>
        <Link to="/popular-teachers"> See More</Link>
      </div>
      <div className=" overflow-x-hidden ">
        <div className="m-auto flex flex-row justify-center items-center">
          {popularCourse.map((card, index) => (
            <TeacherCards
              key={index}
              title={card.title}
              content={card.content}
            />
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
