import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const searchUrl = "http://127.0.0.1:8000/search";
const AllCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [data, setData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  // fetch courses when we load
  useEffect(() => {
    document.title = "LMS | All Courses";
    fetchData();
    try {
      axios.get(baseUrl + "/courses/").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const endpoint = `${searchUrl}/get-data?title=${searchTxt}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResult = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchTxt.toLowerCase())
  );

  return (
    <>
      <form className="m-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            required
          />
        </div>
      </form>
      <h2 className="text-2xl font-bold ml-16 mt-5">Latest Courses</h2>
      <div className="m-0 grid grid-cols-4">
        {searchTxt === ""
          ? courseData &&
            courseData.map((course, index) => (
              <Card className="mt-12 w-72 ml-8 min-w-min" key={index}>
                <CardHeader color="blue-gray" className="relative h-56">
                  <Link to={"/detail/" + course.id}>
                    <img
                      src={course.featured_img}
                      alt={course.title}
                      className="h-full w-full"
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
                    <Link to={"/detail/" + course.id}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          : filteredResult &&
            filteredResult.map((course, index) => (
              <Card className="mt-12 w-72 ml-8 min-w-min" key={index}>
                <CardHeader color="blue-gray" className="relative h-56">
                  <Link to={"/detail/" + course.id}>
                    <img
                      src={course.featured_img}
                      alt={course.title}
                      className="h-full w-full"
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
                    <Link to={"/detail/" + course.id}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

      </div>
        {searchTxt && filteredResult.length === 0 && (
          <p className="m-5 ml-16 text-center font-bold ">Sorry!!! No matching courses found.</p>
        )}
    </>
  );
};

export default AllCourses;
