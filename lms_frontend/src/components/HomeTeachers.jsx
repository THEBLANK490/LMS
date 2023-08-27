import React, { useEffect, useState } from 'react';
import Pagination from '../pages/Pagination';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
const HomeTeachers= () => {
    const [teacherData, setTeacherData] = useState([]);
    
    useEffect(()=>{
        try {
            axios.get(baseUrl+'/teachers/')
            .then((res) => {
              console.log(res.data);
              setTeacherData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    },[])
    return (
        <>
            <h2 className="text-3xl font-bold ml-16 mt-8">Teachers</h2>
            <div className=" overflow-x-hidden ">
                <div className="m-auto grid grid-cols-4 justify-center items-center">
                    {teacherData.map((teacher, index) => (
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
            <Pagination />
        </>
    )
}

export default HomeTeachers