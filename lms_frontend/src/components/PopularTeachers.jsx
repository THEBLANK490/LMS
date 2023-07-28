import React, { useEffect, useState } from 'react';
import Pagination from '../pages/Pagination';
import TeacherCards from '../pages/TeacherCards';
import axios from 'axios';

// const baseUrl='http://127.0.0.1:8000/api';
const PopularTeachers= () => {
    // const [teacher,setTeacher] = useState('null');
    
    // useEffect(()=>{
    //     axios.get(baseUrl+'/teacher/').then((response)=>{
    //         console.log(response.data);
    //     })
    // },[])
    const popularTeachers = [
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
    ];
    return (
        <>
            <h2 className="text-3xl font-bold ml-16 mt-8">Popular Teachers</h2>
            <div className=" overflow-x-hidden ">
                <div className="m-auto grid grid-cols-4 justify-center items-center">
                    {popularTeachers.map((card, index) => (
                        <TeacherCards key={index} title={card.title} content={card.content} />
                    ))}
                </div>
            </div>
            <Pagination />
        </>
    )
}

export default PopularTeachers