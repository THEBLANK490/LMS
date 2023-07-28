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
import Pagination from '../pages/Pagination';

const CategoryCourses = () => {
  return (
    <>
    <h2 className="text-2xl font-bold ml-16 mt-5">Web Development Courses</h2>
        <div className="m-auto grid grid-cols-4 justify-center items-center">
        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <Link to="/detail/1">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="img-blur-shadow"
                layout="fill"
              />
            </Link>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>
              <Link to="/detail/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <Link to="/detail/1">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="img-blur-shadow"
                layout="fill"
              />
            </Link>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>
              <Link to="/detail/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <Link to="/detail/1">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="img-blur-shadow"
                layout="fill"
              />
            </Link>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>
              <Link to="/detail/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <Link to="/detail/1">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="img-blur-shadow"
                layout="fill"
              />
            </Link>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>
              <Link to="/detail/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>
         
        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <Link to="/detail/1">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="img-blur-shadow"
                layout="fill"
              />
            </Link>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>
              <Link to="/detail/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="img-blur-shadow"
              layout="fill"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="img-blur-shadow"
              layout="fill"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>

        <Card className="mt-12 w-72 ml-8 min-w-min">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="img-blur-shadow"
              layout="fill"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Course Title
            </Typography>
            <Typography>Course Description</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>

      </div>
        <Pagination/>
    </>
  )
}

export default CategoryCourses
