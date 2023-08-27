import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Pagination from '../pages/Pagination';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
const AllCourses = () => {
  const[courseData,setCourseData] = useState([]);
  
  // fetch courses when we load
  useEffect(()=>{
      try {
          axios.get(baseUrl+'/courses/')
          .then((res) => {
            console.log(res.data);
              setCourseData(res.data);
          })
      } catch (error) {
          console.log(error);
      }
  },[])

  return (
    <>
    <h2 className="text-2xl font-bold ml-16 mt-5">Latest Courses</h2>
        <div className="m-0 grid grid-cols-4">
          {courseData && courseData.map((course,index)=>
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
          )}

      </div>
        <Pagination/>
    </>
  )
}

export default AllCourses