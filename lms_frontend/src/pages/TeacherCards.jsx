import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const TeacherCards = ({ title, content }) => {
  return (
    <>
   <Link to="/teacher-detail/1">
    <Card className="mt-12 w-72 ml-8 min-w-min">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="img-blur-shadow" layout="fill" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
        <hr className='h-px my-3 bg-gray-800 '/>
      </CardFooter>
    </Card>
    </Link>
    
    </>
  )
}

export default TeacherCards